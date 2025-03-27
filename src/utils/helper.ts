import axios from "axios";
import { removeRoom } from "./firebasehelper";
import md5 from "md5";

import { API_URL, MD5_SALT } from "../../config";
import { Chats } from "../stores/Store";

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
export const handleDeleteRoom = async (roomId: string) => {
  await removeRoom(roomId);
};
export const sendService = async (prompt: string) => {
  const req = await axios.post(`${API_URL}/predict`, {
    prompt,
  });

  return req.data.response || "cevap bulamadım";
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
