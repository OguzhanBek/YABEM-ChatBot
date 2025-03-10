import { MessageCard } from "../../atoms/messageCard";

export const MessageList = () => {
  return (
    <div className="md:w-[60%] w-full mx-auto gap-4 flex flex-col">
      {Array.from({ length: 3 }).map((_, index) => (
        <MessageCard key={index} />
      ))}
    </div>
  );
};
