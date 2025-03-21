import { IoArrowUp } from "react-icons/io5";
import { useState, useEffect } from "react";
import useStore from "../../../stores/Store";

type TextInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  onSubmit?: () => void;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  const aiResponseLoader = useStore((state) => state.aiResponseLoader);

  const [placeholder, setPlaceholder] = useState("Bir mesaj yazın...");
  const [fade, setFade] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const placeholderMessages = [
    "MEF YABEM nedir ?",
    "Kurslara nasıl erişirim ?",
    "Sorularınızı buraya yazabilirsiniz.",
    "MEF YABEM amacı nedir ?",
  ];

  useEffect(() => {
    if (isFocused) return;

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
  }, [isFocused]);

  return (
    <div className="sm:w-full md:w-[80%] lg:w-[70%] xl:w-[60%] w-full mx-auto bg-[#949494] dark:bg-[#303030] p-4 rounded-md">
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder = {placeholder} // Dinamik placeholder
          className={`w-full text-gray-800 dark:text-white bg-[#949494] dark:bg-[#303030] p-1 rounded-md overflow-hidden outline-none resize-none h-10 transition-all duration-300 ${
            fade ? "opacity-0" : "opacity-100 transition-opacity duration-500"
          }`}
        ></textarea>
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={props.onSubmit}
            disabled={aiResponseLoader}
            className={`bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 ${
              aiResponseLoader
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <IoArrowUp color="black" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};