import { create } from "zustand";
import { deleteUserById, getRoomList } from "../utils/firebasehelper";

export type UserData = {
  mail: string;
  password: string;
  id: string;
};

export type Message =
  | {
      text: string;
      type: "bot";
    }
  | {
      text: string;
      type: "user";
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
  updateChats: (value: Chats[]) => void;
  fetchChats: (userId: string) => Promise<Chats[]>;
  updateUser: (value: UserData | null) => void;
  logout: () => void;
  removeUser: () => void;
}

let userData: UserData | null = null;
const userDataString = localStorage.getItem("user");
if (userDataString) {
  userData = JSON.parse(userDataString);
}

const useStore = create<StoreState>((set) => ({
  user: userData,
  chats: [],
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
      deleteUserById(userData?.id || "");
    }
    localStorage.removeItem("user");
    set(() => ({ user: null }));
  },
}));

export default useStore;
