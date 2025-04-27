import { useEffect, useRef } from "react";
import MefLogo from "../../../assets/Mef_Universitesi_Logo.jpg";
import useStore from "../../../stores/Store";
import { Loader } from "../loader/Loader";

type MessageCardProps = {
  text: string | React.ReactNode // JSX bileşenleri için
  type: "user" | "bot"
};

export const MessageCard: React.FC<MessageCardProps> = (props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const aiResponseLoader = useStore((state) => state.aiResponseLoader);

  useEffect(() => {
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []); 

  return (
    <div
      className={`messagecard flex flex-col gap-4 flex-wrap   ${
        props.type === "bot" ? "items-start" : "items-end"
      }`}
    >
      {props.type === "bot" ? (
        <div className="flex flex-row">
          <img
            src={MefLogo}
            alt="Bot Avatar"
            className="w-8 h-8 rounded-full mr-4  object-cover"
          />
          <div
            className={`messagecard-text lg:max-w-[70%]md:max-w-[80%] max-w-[500px] text-gray-800 dark:text-white dark:bg-[#303030] p-4 rounded-md break-words whitespace-pre-wrap ${
              aiResponseLoader
                ? "flex items-center justify-center"
                : "bg-[#969696]"
            }`}
          >
            { props.text == "" ? <Loader/> : props.text}
          </div>
        </div>
      ) : (
        <div
          className={`messagecard-text   md:max-w-[80%] max-w-[500px] text-gray-800 dark:text-white dark:bg-[#303030] p-4 rounded-md break-words whitespace-pre-wrap bg-[#c7c7c7]`}
        >
          {props.text}
        </div>
      )}
      <div ref={targetRef}></div>
    </div>
  );
};