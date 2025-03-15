import { Message } from "../../../stores";
import { MessageCard } from "../../atoms/messageCard";

type MessageListProps = {
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = (props) => {
  return (
    <div className="md:w-[60%] w-full mx-auto gap-4 flex flex-col">
      {props.messages.map((message, index) => (
        <MessageCard key={index} text={message.text} type={message.type} />
      ))}
    </div>
  );
};
