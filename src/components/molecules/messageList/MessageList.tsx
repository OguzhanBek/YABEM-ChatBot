import { Message } from "../../../stores/Store";
import { MessageCard } from "../../atoms/messageCard/MessageCard";

type MessageListProps = {
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = (props) => {
  return (
    <div className="md:w-[60%] w-full mx-auto gap-4 flex flex-col max-w-400  ">
      {props.messages.map((message, index) => (
        <MessageCard key={index} text={message.text} type={message.type} />
      ))}
    </div>
  );
};
