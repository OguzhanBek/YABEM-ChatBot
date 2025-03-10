import { Outlet } from "react-router-dom";
import { Sidebar } from "./Components/Sidebar";

import { Navbar } from "./Components/Navbar";
import { Modal } from "../../components/template/modal";
import { LiaTimesSolid } from "react-icons/lia";
import { FaRegComments, FaRegEdit } from "react-icons/fa";
import { useSearch } from "../../context/Context";
import MyAccount from "../myAccount/MyAccount";

export const WebLayout = () => {
  const { toggleSearch } = useSearch(); // toggleSearch fonksiyonunu al

  return (
    <div className="w-full flex-row flex shrink-0">
      <Sidebar />
      <main className="flex flex-1 w-full shrink-0 flex-col overflow-x-hidden h-screen relative bg-[#212121]">
        <div className="justify-center items-center flex">
          <Navbar />
        </div>
        <div className="p-4 flex flex-1">
          <Outlet />
        </div>
      </main>
      <Modal>
        <div className="bg-[#303030] w-[30%] rounded-lg p-4">
          <div className="flex flex-row gap-2 border-b border-[#808080] pb-2 mb-2">
            <input
              type="text"
              className="w-full p-2 rounded-md bg-[#303030] text-white outline-none"
              placeholder="Ara..."
            />
            <button
              className="cursor-pointer hover:bg-white/20 items-center justify-center w-10 h-10 p-2 rounded-sm group"
              onClick={toggleSearch} // toggleSearch fonksiyonunu çağır
            >
              <LiaTimesSolid
                size={24}
                className="text-[#9B9B9B] group-hover:text-white transition-colors"
              />
            </button>
          </div>
          <div>
            <div className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm">
              <FaRegEdit
                size={18}
                className="text-white group-hover:text-white transition-colors"
              />
              <span className="text-white">Yeni Sohbet</span>
            </div>

            <ul>
              <li>
                <div className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm">
                  <FaRegComments
                    size={18}
                    className="text-white group-hover:text-white transition-colors"
                  />
                  <span className="text-white">
                    Zustand React TypeScript Kurulumu
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm">
                  <FaRegComments
                    size={18}
                    className="text-white group-hover:text-white transition-colors"
                  />
                  <span className="text-white">
                    Zustand React TypeScript Kurulumu
                  </span>
                </div>
              </li>
              <li>
                <div className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer">
                  <FaRegComments
                    size={18}
                    className="text-white group-hover:text-white transition-colors"
                  />
                  <span className="text-white">
                    Zustand React TypeScript Kurulumu
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Modal>

    </div>
  );
};