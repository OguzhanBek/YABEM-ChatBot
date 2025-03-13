import { create } from "zustand";
import { deleteUserById } from "../utils/firebasehelper";

export type UserData = {
  mail: string;
  password: string;
  id: string;
};

interface StoreState {
  user: UserData | null;
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
