import { Message } from "../../../stores/Store";
import { Loader } from "../../atoms/loader/Loader";
import { MessageCard } from "../../atoms/messageCard/MessageCard";

type MessageListProps = {
  messages: Message[];
  isLoader: boolean;
};

export const MessageList: React.FC<MessageListProps> = (props) => {
  return (
    <div className="w-full  md:w-[90%] lg:w-[70%] xl:w-[60%] mx-auto gap-4 flex flex-col   break-words" >
      {props.messages.map((message, index) => (
        <MessageCard key={index} text={message.text} type={message.type} />
      ))}
      {props.isLoader && <MessageCard text= {<Loader/>}  type="bot" />}
    </div>
  );
};
