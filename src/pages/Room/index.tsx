import { useParams } from "react-router-dom";
import { TextInput } from "../../components/atoms/textInput";
import { MessageList } from "../../components/molecules/messageList";
import { useEffect, useState } from "react";
import { Chats, Message } from "../../stores";
import { getRoomData } from "../../utils/firebasehelper";
import { Loader } from "../../components/atoms/loader/Loader";

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
    console.log(message);
    console.log("AI: " + "buraya yapay zeka cevabı gelecek");
  };

  const sendMessage = async () => {
    if (!userText) return;
    setMessageList((prev) => [
      ...prev,
      { text: userText, type: "user", createAt: Date.now() },
    ]);
    console.log("userText ai isetek atıp cevap alınacak", userText);
    // askAI(userText);
    // alert("AI: " + "buraya yapay zeka cevabı gelecek");
    setuserText("");
  };

  return (
    <div className="w-full relative flex flex-col gap-5 ">
      <div className="h-[calc(100vh-15rem)] shrink-0 flex-col p-4 flex gap-4 overflow-hidden overflow-y-auto">
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
