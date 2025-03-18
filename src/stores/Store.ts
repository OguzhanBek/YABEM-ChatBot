import { create } from "zustand";
import { deleteUserById, getRoomList } from "../utils/firebasehelper";

export type UserData = {
  mail: string;
  password: string;
  id: string;
};

export type Message =
  | {
      text: string | React.ReactNode; // JSX bileşenleri için
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
  updateChats: (value: Chats[]) => void;
  fetchChats: (userId: string) => Promise<Chats[]>;
  updateUser: (value: UserData | null) => void;
  logout: () => void;
  removeUser: () => void;
  setAiResponseLoader: (value: boolean) => void; // Yükleme durumunu güncelle
}

let userData: UserData | null = null;
const userDataString = localStorage.getItem("user");
if (userDataString) {
  userData = JSON.parse(userDataString);
}

export const useStore = create<StoreState>((set) => ({
  user: userData,
  chats: [],
  aiResponseLoader: false,
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
  removeUser: () => {
    if (userData) {
      deleteUserById(userData.id);
    }
    localStorage.removeItem("user");
    set(() => ({ user: null }));
  },
  setAiResponseLoader: (value) => {
    set(() => ({ aiResponseLoader: value })); // aiResponseLoader'ı güncelle
  },
}));

export default useStore;
