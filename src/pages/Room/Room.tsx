import { useParams } from "react-router-dom";
import { TextInput } from "../../components/atoms/textInput/TextInput";
import { MessageList } from "../../components/molecules/messageList/MessageList";
import { useCallback, useEffect, useState } from "react";
import useStore, { Chats, Message } from "../../stores/Store";
import { getRoomData, pushMessage } from "../../utils/firebasehelper";
import { Loader } from "../../components/atoms/loader/Loader";
import { sendService } from "../../utils/helper";
import { toast } from "react-toastify";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Room = () => {
  const { aiResponseLoader } = useStore();
  const { id } = useParams<{ id: string }>();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userText, setuserText] = useState("");

  const { transcript, listening } = useSpeechRecognition();

  const setAiResponseLoader = useStore((state) => state.setAiResponseLoader);

  const fetchMessages = async () => {
    setLoading(true);
    setMessageList([]);
    if (!id) return;
    const messages: Chats = await getRoomData(id);
    if (!messages) return;
    setTimeout(() => {
      setMessageList(messages.messages);
      setLoading(false);
      let lastMessage = messages.messages[messages.messages.length - 1];
      if (lastMessage.type === "user") {
        askAI(lastMessage.text);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const askAI = async (message: string) => {
    if (!id) return;

    setAiResponseLoader(true);

    const botMessage: Message = {
      id: "streaming",
      text: "",
      type: "bot",
      createdAt: Date.now(),
    };

    // Boş bot mesajı ekle
    setMessageList((prev) => [...prev, botMessage]);

    try {
      await sendService(
        message,
        (token: string) => {
          // console.log(token);
          setMessageList((prev) =>
            prev.map((msg) =>
              msg.id === "streaming"
                ? { ...msg, text: (msg.text || "") + token }
                : msg
            )
          );
        },
        async (fulltext) => {
          await pushMessage(id, {
            text: fulltext,
            type: "bot",
            createdAt: Date.now(),
          });
        }
      );

      // Tamamlandıktan sonra "streaming" olan mesajın id'sini kaldır
      setMessageList((prev) =>
        prev.map((msg) =>
          msg.id === "streaming" ? { ...msg, id: undefined } : msg
        )
      );
    } catch (error) {
      toast.error("AI'den cevap alınırken hata oluştu", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      console.error("AI'den cevap alınırken hata oluştu", error);
      setMessageList((prev) => prev.filter((msg) => msg.id !== "streaming"));
    } finally {
      setAiResponseLoader(false);
    }
  };

  const sendMessage = useCallback(async () => {
    if (!userText || !id) return;
    const userMessage: Message = {
      text: userText,
      type: "user",
      createAt: new Date().valueOf(),
    };

    let pushmessage = await pushMessage(id, userMessage);
    if (pushmessage) {
      setMessageList((prev) => [
        ...prev,
        { text: userText, type: "user", createAt: Date.now() },
      ]);
      setuserText("");
      await askAI(userText);
    }
  }, [userText, id, pushMessage, setMessageList, setuserText, askAI]) 

  useEffect(() => {
    if (transcript === "") return;
    setuserText(() => ( transcript));
  }, [transcript]);

  return (
    <div className="w-full relative flex flex-col gap-5  dark:bg-[#212121] ">
      <div className="h-[calc(100vh-15rem)] shrink-0 flex-col p-4 flex gap-4 overflow-hidden overflow-y-auto  text-white ">
        {loading && <Loader />}
        <MessageList messages={messageList} isLoader={aiResponseLoader} />
      </div>
      <TextInput
        onChange={(e) => {
          setuserText(e.target.value);
        }}
        value={userText}
        onSubmit={() => {
          sendMessage();
        }}
        startSpeech={() => SpeechRecognition.startListening()}
        stopSpeech={() => SpeechRecognition.stopListening()}
        listening={listening}
      />
    </div>
  );
};