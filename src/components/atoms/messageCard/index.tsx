 import MefLogo from "../../../assets/Mef_Universitesi_Logo.jpg";


type MessageCardProps = {
  text: string;
  type: "bot" | "user";
};
export const MessageCard: React.FC<MessageCardProps> = (props) => {
  return (
    <div
      className={`messagecard flex flex-col gap-4 flex-wrap  ${
        props.type === "bot" ? "items-start " : "items-end"
      }`}
    >
      {props.type === "bot" ? (
        <div className="flex flex-row">
          <img
            src={MefLogo}
            alt="Bot Avatar"
            className="w-8 h-8 rounded-full mr-4" 
          />
          <div
            className={`messagecard-text lg:max-w-[70%] md:max-w-[80%] max-w-full   text-gray-800 dark:text-white dark:bg-[#303030] p-4 rounded-md break-words whitespace-pre-wrap ${"bg-[#969696]  "}`}
          >
            {props.text}
          </div>
        </div>
      ) : (
        <div
          className={`messagecard-text lg:max-w-[60%] md:max-w-[80%] max-w-full   text-gray-800 dark:text-white dark:bg-[#303030] p-4 rounded-md break-words whitespace-pre-wrap ${"bg-[#c7c7c7]"}`}
        >
          {props.text}
        </div>
      )}
    </div>
  );
};
