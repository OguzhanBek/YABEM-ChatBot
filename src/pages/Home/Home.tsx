import {  useState } from "react";
import { TextInput } from "../../components/atoms/textInput/TextInput";
import { createRoom } from "../../utils/firebasehelper";
import useStore, { Message } from "../../stores/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Home = () => {
  const { user, fetchChats } = useStore();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const createChat = async () => {
    if (!message) return;
    if (!user) return;

    const newMessage: Message = {
      type: "user",
      createAt: new Date().valueOf(),
      text: message,
    };

    const newChat = await createRoom(user.id, newMessage);
    if (newChat) {
      navigate(`/chat/${newChat.roomId}`);
      await fetchChats(user.id);
      return;
    }
    toast.error("Yeni Sohbet başlatılamadı!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });
  };

  return (
    <div className="relative flex flex-col gap-5 items-center md:justify-center justify-end w-full">
      <h1 className="text-4xl font-bold text-gray-500 animated-text">Mef Yabem ChatBot'a Hoşgeldiniz</h1>
      <div className="md:w-[80%] w-full">
        <TextInput
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onSubmit={createChat}
        />
      </div>
    </div>
  );
};
