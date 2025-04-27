import { removeRoom } from "./firebasehelper";
import md5 from "md5";

import { API_URL, MD5_SALT } from "../../config";
import { Chats } from "../stores/Store";
import { toast } from "react-toastify";

type GroupedChats = {
  badge: string;
  chats: Chats[];
};

export const generateUUID = (length = 18) => {
  const perms = "ABCDEFGHIJKLMNORSTUVWYZabcdefghijklmnoprstuvyz0123456789";
  let result = "";
  for (let index = 0; index < length; index++) {
    result += perms.charAt(Math.floor(Math.random() * perms.length));
  }
  return result;
};
export const generateOTP = (length = 6) => {
  const perms = "0123456789";
  let result = "";
  for (let index = 0; index < length; index++) {
    result += perms.charAt(Math.floor(Math.random() * perms.length));
  }
  return result;
};
export const handleDeleteRoom = async (roomId: string) => {
  await removeRoom(roomId);
};
export const sendService = async (
  message: string,
  onTokenReceived: (token: string) => void,
  onFinished?: (fullText: string) => void
) => {
  const response = await fetch(`${API_URL}/predict?stream=true` , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: message }),
  });
// -------------------------------------BURA SONRADAN EKLENDİ HATA SORUNUNU ÇÖZMEYEBİLİR ------------------------------------------------------

  if (!response.body) throw new Error("Stream başlatılamadı.");
  if (!response.ok) {  // Burası sonradan eklendi. Hataların kaynağı burası olursa dikkat et
    let errorMsg = `Sunucu hatası (${response.status})`; // Varsayılan mesaj
    try {
      // Sunucudan gelen JSON formatındaki hatayı almaya çalış
      const errorData = await response.json();
      errorMsg =
        errorData.response ||
        errorData.message ||
        `${response.status} ${response.statusText}`;
    } catch (parseError) {
      // Yanıt JSON değilse veya parse edilemiyorsa status text kullan
      errorMsg = `${response.status} ${response.statusText}`;
    }
    console.error("Sunucu yanıtı başarısız:", errorMsg, response);
    toast.error(`İstek başarısız: ${errorMsg}`); // Hata mesajını toast ile göster
    if (onFinished) onFinished(""); // İşlemi boş yanıtla bitir
    return; // Hata durumunda fonksiyondan çık
  }

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------
 
const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  
  let partial = "";
  let fullResponse = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    partial += decoder.decode(value, { stream: true });

    const lines = partial.split("\n");

    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();

      if (line.startsWith("data: ")) {
        const jsonStr = line.slice(6);
        if (jsonStr === "[DONE]") {
          if (onFinished) onFinished(fullResponse);
          return;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed.token) {
            onTokenReceived(parsed.token);
            fullResponse += parsed.token;
          }
        } catch (e) {
          console.warn("Geçersiz JSON:", jsonStr);
        }
      }
    }

    partial = lines[lines.length - 1];
  }

  // Güvenlik için fallback
  if (onFinished) onFinished(fullResponse);
};

export const generateMD5 = (text: string) => {
  const MD5_KEY = MD5_SALT;
  return md5(text + MD5_KEY);
};

export const groupChatsByDate = (chats: Chats[]): GroupedChats[] => {
  const now = new Date();
  const groups: { [key: string]: Chats[] } = {
    day: [],
    yesterday: [],
    week: [],
    month: [],
    older: [],
  };

  chats
    .sort((a, b) => b.createAt - a.createAt)
    .forEach((chat) => {
      const chatDate = new Date(chat.createAt);
      const diffTime = now.getTime() - chatDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        groups.day.push(chat);
      } else if (diffDays < 2) {
        groups.yesterday.push(chat);
      } else if (diffDays < 7) {
        groups.week.push(chat);
      } else if (diffDays < 30) {
        groups.month.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

  return Object.entries(groups)
    .filter(([_, chats]) => chats.length > 0) // Boş grupları kaldır
    .map(([badge, chats]) => ({
      badge:
        badge === "day"
          ? "bugün"
          : badge === "yesterday"
          ? "dün"
          : badge === "week"
          ? "1 hafta önce"
          : badge === "month"
          ? "1 ay önce"
          : "1 aydan daha önce",
      chats,
    }));
};
