type MessageCardProps = {
  text: string;
  type: "bot" | "user";
};
export const MessageCard: React.FC<MessageCardProps> = (props) => {
  return (
    <div
      className={`flex flex-col gap-4  items-${
        props.type === "bot" ? "start" : "end"
      }`}
    >
      <div className="md:max-w-[60%] max-w-full bg-[#303030] p-4 rounded-md">
        {props.text}
      </div>
    </div>
  );
};
