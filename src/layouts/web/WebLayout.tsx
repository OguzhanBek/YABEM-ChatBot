import { Outlet } from "react-router-dom";
import { Sidebar } from "./Components/Sidebar";
import { Navbar } from "./Components/Navbar";

export const WebLayout = () => {

  return (
    <div className="w-full flex-row flex shrink-0 ">
      <Sidebar />
      <main className="flex flex-1 w-full shrink-0 flex-col overflow-x-hidden h-screen relative bg-[#ffffff] dark:bg-[#212121] text-black dark:text-white">
        <div className="justify-center items-center flex">
          <Navbar />
        </div>
        <div className="p-4 flex flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};