import { IoArrowUp } from "react-icons/io5";
import { useState, useEffect } from "react";
import useStore from "../../../stores/Store";
import { FaMicrophone } from "react-icons/fa";
import { CiMicrophoneOff } from "react-icons/ci";

import React from "react";

type TextInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  onSubmit?: () => void;
  startSpeech: () => void;
  stopSpeech: () => void;
  listening: boolean;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  const aiResponseLoader = useStore((state) => state.aiResponseLoader);

  const [placeholder, setPlaceholder] = useState("Bir mesaj yazın...");
  const [fade, setFade] = useState(false);

  const placeholderMessages = [
    "MEF YABEM nedir ?",
    "Kurslara nasıl erişirim ?",
    "Sorularınızı buraya yazabilirsiniz.",
    "MEF YABEM amacı nedir ?",
  ];

  useEffect(() => {
    let textVal = props.value?.length ? props.value?.length : 0;
    if (textVal > 0) return;

    let index = 0;
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setPlaceholder(placeholderMessages[index]);
        setFade(false);
        index = (index + 1) % placeholderMessages.length;
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [props.value]);


  return (
    <div className="sm:w-full md:w-[80%] lg:w-[70%] xl:w-[60%] w-full mx-auto bg-[#00000] dark:bg-[#303030] p-4 rounded-md shadow-md ">
      <div className="text-white">
        <textarea
          name="text"
          onChange={props.onChange}
          value={props.value}
          onKeyDown={(e) => {
            if (aiResponseLoader && e.key === "Enter") {
              e.preventDefault();
              return;
            }
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              props.onSubmit && props.onSubmit();
            }
          }}
          
          placeholder={placeholder} // Dinamik placeholder
          className={`w-full text-gray-800 dark:text-white bg-[#00000] dark:bg-[#303030] p-1 rounded-md overflow-hidden outline-none resize-none h-10 transition-all duration-300 ${
            fade ? "opacity-0" : "opacity-100 transition-opacity duration-500"
          }`}
        ></textarea>

        {/* Dinelme Butonları*/}
       
        <div className="flex justify-end items-center gap-4">
          {props.listening ? (
            <button
              onClick={() => {
                props.stopSpeech();
              }}
              className={`bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 opacity-50 cursor-pointer hover:bg-[#79797c] 
              `
           }
           
            >
              <CiMicrophoneOff color="black" size={20} />
            </button>
            
          ) : (
            <button
              onClick={() => {
                props.startSpeech();
              }}
              className={`bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-[#79797c] cursor-pointer
              
         `}
            >
              <FaMicrophone color="black" size={20} />
            </button>
          )}

          {/* Dinelme Butonları yukarıda   Aşağısı submit butonu. */}

          <button
            onClick={props.onSubmit}
            disabled={aiResponseLoader}
            className={`bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 ${
              aiResponseLoader
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } ${
              props.value?.length == 0
                ? "" 
                : "hover:bg-[#79797c]"
            }`}
          >
            <IoArrowUp color="black" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};