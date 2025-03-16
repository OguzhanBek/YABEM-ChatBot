type MessageCardProps = {
  text: string;
  type: "bot" | "user";
};
export const MessageCard: React.FC<MessageCardProps> = (props) => {
  return (
    <div
      className={`flex flex-col gap-4 flex-wrap  ${
        props.type === "bot" ? "items-start " : "items-end"
      }`}
    >
      <div
        className={`lg:max-w-[60%] md:max-w-[80%] max-w-full   text-gray-800 dark:text-white dark:bg-[#303030] p-4 rounded-md break-words whitespace-pre-wrap ${props.type === "bot" ? "bg-[#969696] " : "bg-[#c7c7c7]" }`}
      >
        {props.text}
      </div>
    </div>
  );
};
