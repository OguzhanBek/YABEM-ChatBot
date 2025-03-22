import { useParams } from "react-router-dom";
import { TextInput } from "../../components/atoms/textInput/TextInput";
import { MessageList } from "../../components/molecules/messageList/MessageList";
import { useEffect, useState } from "react";
import useStore, { Chats, Message } from "../../stores/Store";
import { getRoomData, pushMessage } from "../../utils/firebasehelper";
import { Loader } from "../../components/atoms/loader/Loader";
import { sendService } from "../../utils/helper";
import { toast } from "react-toastify";

export const Room = () => {
  const { aiResponseLoader } = useStore();
  const { id } = useParams<{ id: string }>();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userText, setuserText] = useState("");

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
        askAI(lastMessage.text as string);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const askAI = async (message: string) => {
    if (!id) return;

    setAiResponseLoader(true);
    try {
      let response = await sendService(message);

      const botResponse: Message = {
        text: response,
        type: "bot",
        createdAt: Date.now(),
      };

      let pushmessage = await pushMessage(id, botResponse);
      if (pushmessage) {
        setMessageList((prev) =>
          prev.filter((msg) => msg.id !== "loading").concat(botResponse)
        );
      }
    } catch (error) {
      toast.error("AI'den cevap alınırken hata oluştu", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      console.error("AI'den cevap alınırken hata oluştu", error);
      setMessageList((prev) => prev.filter((msg) => msg.id !== "loading"));
    } finally {
      // AI yanıtı işlemi tamamlandı
      setAiResponseLoader(false);
    }
  };

  const sendMessage = async () => {
    if (!userText || !id) return;
    const botResponse: Message = {
      text: userText,
      type: "user",
      createAt: new Date().valueOf(),
    };

    let pushmessage = await pushMessage(id, botResponse);
    if (pushmessage) {
      setMessageList((prev) => [
        ...prev,
        { text: userText, type: "user", createAt: Date.now() },
      ]);
      setuserText("");
      await askAI(userText);
    }
  };

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
      />
    </div>
  );
};
