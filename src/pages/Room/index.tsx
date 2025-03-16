import { useParams } from "react-router-dom";
import { TextInput } from "../../components/atoms/textInput";
import { MessageList } from "../../components/molecules/messageList";
import { useEffect, useState } from "react";
import { Chats, Message } from "../../stores";
import { getRoomData, pushMessage } from "../../utils/firebasehelper";
import { Loader } from "../../components/atoms/loader/Loader";
import { sendService } from "../../utils/helper";

export const Room = () => {
  const { id } = useParams<{ id: string }>();

  const [messageList, setMessageList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userText, setuserText] = useState("");

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
    let response = await sendService(message);
    const botResponse: Message = {
      text: response,
      type: "bot",
    };

    let pushmessage = await pushMessage(id, botResponse);
    if (pushmessage) {
      setMessageList((prev) => [
        ...prev,
        { text: response, type: "bot", createAt: Date.now() },
      ]);
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
      console.log("userText ai isetek atıp cevap alınacak", userText);
      setuserText("");
      await askAI(userText);
    }
  };

  return (
    <div className="w-full relative flex flex-col gap-5  dark:bg-[#212121] ">
      <div className="h-[calc(100vh-15rem)] shrink-0 flex-col p-4 flex gap-4 overflow-hidden overflow-y-auto  text-white ">
        {loading && <Loader />}
        <MessageList messages={messageList} />
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
