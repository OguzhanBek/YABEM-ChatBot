import { useEffect, useState } from "react";
import { TextInput } from "../../components/atoms/textInput/TextInput";
import { createRoom } from "../../utils/firebasehelper";
import useStore, { Message } from "../../stores/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Home = () => {
  const { user, fetchChats, selectedModel } = useStore();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { transcript, listening } = useSpeechRecognition();
  const createChat = async () => {
    if (!message) return;
    if (!user) return;

    const newMessage: Message = {
      type: "user",
      createAt: new Date().valueOf(),
      text: message,
      selectedModel: selectedModel,
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


  useEffect(() => {
    if (transcript === "") return;
    setMessage(() => transcript);
  }, [transcript]);

  return (
    <div className="relative flex flex-col gap-5 items-center md:justify-center justify-end w-full">
      <h1
        className="text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-500 to-pink-200
                 bg-clip-text text-transparent animated-gradient"
      >
        Mef Yabem ChatBot'a Hoşgeldiniz
      </h1>
      <div className="w-full">
        <TextInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={createChat}
          startSpeech={() => SpeechRecognition.startListening()}
          stopSpeech={() => SpeechRecognition.stopListening()}
          listening={listening}
        />
      </div>
    </div>
  );
};
