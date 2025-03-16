import { useState } from "react";
import { TextInput } from "../../components/atoms/textInput";
import { createRoom } from "../../utils/firebasehelper";
import useStore, { Message } from "../../stores";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedText from "../../components/molecules/animatedText/AnimatedText";

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
      <AnimatedText
        text="Merhaba, ben MEF Yabem Chat Bot v1.0. Benimle sohbet etmek için bir şeyler sorun"
        delay={100} // Her karakter arasındaki gecikme (ms cinsinden)
      />
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