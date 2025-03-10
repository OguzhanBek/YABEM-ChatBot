import axios from "axios";
import { removeRoom } from "./firebasehelper";


export type Message = {
  text: string;
  type: "bot" | "user";
  createAt?: number;
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
  const req = await axios.post("http://localhost:5000/predict", {
    prompt,
  });

  return req.data.response || "cevap bulamadım";
};
export const createMessage = (text: string, type: "bot" | "user") => ({
  text,
  type,
  createdAt: new Date().valueOf(),
});
