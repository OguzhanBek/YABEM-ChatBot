import { TextInput } from "../../components/atoms/textInput";
import { MessageList } from "../../components/molecules/messageList";

export const Room = () => {
  return (
    <div className="w-full relative flex flex-col gap-5 ">
      <div className="h-[calc(100vh-15rem)] shrink-0 flex-col p-4 flex gap-4 overflow-hidden overflow-y-auto">
        <MessageList />
      </div>
      <TextInput />
    </div>
  );
};
