import { create } from "zustand";
import { deleteUserById, getRoomList } from "../utils/firebasehelper";

export type UserData = {
  mail: string;
  password: string;
  id: string;
};

export type Message =
  | {
      text: string; // JSX bileşenleri için
      type: "bot";
      id?: string;
      createdAt: number;
    }
  | {
      text: string;
      type: "user";
      id?: string;
      createAt: number;
    };

export type Chats = {
  roomId: string;
  roomName: string;
  userId: string;
  createAt: number;
  messages: Message[];
};

interface StoreState {
  user: UserData | null;
  chats: Chats[];
  aiResponseLoader: boolean; // Yükleme durumu
  theme: "light" | "dark"; // Tema
  toggleTheme: (value: "light" | "dark") => void; // Tema değiştirme fonksiyonu
  updateChats: (value: Chats[]) => void;
  fetchChats: (userId: string) => Promise<Chats[]>;
  updateUser: (value: UserData | null) => void;
  logout: () => void;
  removeUser: () => void;
  setAiResponseLoader: (value: boolean) => void; // Yükleme durumunu güncelle
}

export const useStore = create<StoreState>((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
  chats: [],
  aiResponseLoader: false,
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  toggleTheme: (value) => {
    localStorage.setItem("theme", value);
    set(() => ({ theme: value }));
  },
  updateChats: (value) => {
    set(() => ({ chats: value }));
  },

  fetchChats: async (userId: string) => {
    const allChat: Chats[] = await getRoomList();
    const getUserChats = allChat.filter((chat) => chat.userId === userId);
    if (getUserChats) {
      set(() => ({ chats: getUserChats }));
      return getUserChats;
    }
    return [];
  },

  updateUser: (value) => {
    localStorage.setItem("user", JSON.stringify(value));
    set(() => ({ user: value }));
  },
  logout: () => {
    localStorage.removeItem("user");
    set(() => ({ user: null }));
  },
  removeUser: async () => {
    let state = useStore.getState();
    let userData = state.user;
    if (userData) {
      await deleteUserById(userData.id).then(() => {
        localStorage.removeItem("user");
        set(() => ({ user: null }));
      });
    }
    console.log(userData, "id");
  },
  setAiResponseLoader: (value) => {
    set(() => ({ aiResponseLoader: value })); // aiResponseLoader'ı güncelle
  },
}));

export default useStore;
