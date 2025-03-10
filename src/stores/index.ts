import { create } from "zustand";

export type UserData = {
  name: string;
  password: string;
  id: string;
};
// Store'un tip tanımları
interface StoreState {
  // User state'i
  user: UserData;
  updateUser: (value: UserData) => void;
}

// Store'u oluşturma
const useStore = create<StoreState>((set) => ({
  // Counter state'i ve fonksiyonları

  // User state ve fonksiyonları
  user: (JSON.parse(localStorage.getItem("users")) as UserData) || {
    name: "",
    password: "",
    id: "",
  },
  updateUser: (value) =>
    set(() => ({
      user: value,
    })),
}));

export default useStore;
