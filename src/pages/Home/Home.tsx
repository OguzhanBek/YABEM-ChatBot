import { TextInput } from "../../components/atoms/textInput";

export const Home = () => {
  return (
    <div className=" relative flex flex-col gap-5  items-center md:justify-center justify-end w-full ">
      <h1
      className="text-2xl font-bold text-center w-full md:w-[40%]" 
      >
        Merhaba, ben MEF Yabem Chat Bot v1.0. Benimle sohbet etmek için bir şeyler sorun
      </h1>
      <div className="md:w-[80%] w-full">
        <TextInput />
      </div>
    </div>
  );
};
