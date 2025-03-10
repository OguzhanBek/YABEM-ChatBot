import { create } from "zustand";

export type UserData = {
  name: string;
  password: string;
  id: string;
};

// Store'un tip tanımları
interface StoreState {
  user: UserData;
  updateUser: (value: UserData) => void;

}

// Store'u oluşturma
const useStore = create<StoreState>((set) => ({
  // Kullanıcı bilgilerini saklayan state
  user: (JSON.parse(localStorage.getItem("users") || "null") as UserData) || {
    name: "",
    password: "",
    id: "",
  },
  updateUser: (value) => set(() => ({ user: value })),

}));

export default useStore;
