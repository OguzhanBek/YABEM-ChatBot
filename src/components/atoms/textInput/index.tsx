import { IoArrowUp } from "react-icons/io5";

export const TextInput = () => {
  return (
    <div className="md:w-[60%] w-full mx-auto bg-[#303030] p-4 rounded-md">
      <div>
        <textarea
          name="text"
          id=""
          placeholder="Bir mesaj yazın..."
          className="w-full bg-[#303030] p-1 rounded-md overflow-hidden outline-none resize-none h-10"
        ></textarea>
        <div className="flex justify-end items-center gap-4">
          <button className="bg-white p-2 rounded-full w-10 h-10 items-center justify-center flex cursor-pointer">
            <IoArrowUp color="black" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
