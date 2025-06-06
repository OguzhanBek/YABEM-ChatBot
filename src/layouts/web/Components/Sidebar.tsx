import { BiEdit } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal, { ModalRef } from "../../../components/template/modal/Modal";
import SearchModalContent from "../../../components/molecules/searchModalContent/SearchModalContent";
import { useRef } from "react";
import { Chatlist } from "../../../components/molecules/chatList/Chatlist";

export const Sidebar = () => {
  const modalRef = useRef<ModalRef>(null);

  return (
    <div
      className="dark:bg-[#171717]  dark:text-white text-black bg-[#F9F9F9] h-screen flex flex-col w-[250px] md:relative absolute  gap-4 z-10 md:-left-0 -left-[300px] transition-all border-b border-[#2c2f33]"
      id="menu"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-2">
          <div className="text-white text-2xl font-bold">
            <button
              className="md:hidden cursor-pointer hover:bg-black/20 items-center justify-center w-10 h-10 p-2 rounded-sm group"
              onClick={() => {
                document
                  .getElementById("menu")
                  ?.classList.toggle("menu-active");
              }}
            >
              <MdOutlineSpaceDashboard className="text-[#9B9B9B] group-hover:text-white transition-colors" />
            </button>
          </div>
          <div className="flex flex-row gap-2 ">
            <button
              className="cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 items-center justify-center w-10 h-10 p-2 rounded-sm group"
              onClick={() => {
                modalRef.current?.open();
              }}
            >
              <IoMdSearch
                size={24}
                className="text-gray-600 dark:text-[#9B9B9B] group-hover:text-white transition-colors"
              />
            </button>
            <Link
              to={"/"}
              className="cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 items-center justify-center w-10 h-10 p-2 rounded-sm group"
            >
              <BiEdit
                size={24}
                className="text-gray-600 dark:text-[#9B9B9B] group-hover:text-white transition-colors "
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="chat-history ">
        <ul>
          <li>
            <Link
              to={"/"}
              className="flex flex-row px-4 py-2 hover:bg-gray-400/70 items-center rounded-sm dark:hover:bg-white/10 w-full gap-2 cursor-pointer"
            >
              <FaRegEdit size={20} />
              <span className="font-normal text-sm mt-1">Yeni Sohbet</span>
            </Link>
          </li>
        </ul>
      </div>

      <div
        className="flex flex-col overflow-hidden overflow-y-auto p-4
        [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-[#424242]"
      >
        <Chatlist />
      </div>

      <Modal ref={modalRef}>
        <SearchModalContent modalRef={modalRef} />
      </Modal>
    </div>
  );
};