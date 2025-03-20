import { Message } from "../../../stores/Store";
import { MessageCard } from "../../atoms/messageCard/MessageCard";

type MessageListProps = {
  messages: Message[];
};

export const MessageList: React.FC<MessageListProps> = (props) => {
  return (
    <div className="w-full  md:w-[90%] lg:w-[70%] xl:w-[60%] mx-auto gap-4 flex flex-col   break-words" >
      {props.messages.map((message, index) => (
        <MessageCard key={index} text={message.text} type={message.type} />
      ))}
    </div>
  );
};
