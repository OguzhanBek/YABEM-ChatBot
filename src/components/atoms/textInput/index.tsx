import { IoArrowUp } from "react-icons/io5";

type TextInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  onSubmit?: () => void;
};
export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div className="md:w-[60%] w-full mx-auto bg-[#949494] dark:bg-[#303030] p-4 rounded-md">
      <div className=" text-white">

        <textarea 
          name="text"
          id=""
          onChange={props.onChange}
          value={props.value}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              props.onSubmit && props.onSubmit();
            }
          }}
          placeholder="Bir mesaj yazın..."
          className="w-full text-gray-800 dark:text-white bg-[#949494] dark:bg-[#303030] p-1 rounded-md overflow-hidden outline-none resize-none h-10"
        ></textarea>
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={props.onSubmit}
            className="bg-white p-2 rounded-full w-10 h-10 items-center justify-center flex cursor-pointer"
          >
            <IoArrowUp color="black" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
