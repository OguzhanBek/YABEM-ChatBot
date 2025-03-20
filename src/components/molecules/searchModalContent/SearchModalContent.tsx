import React, { useState } from "react";
import { FaRegComments, FaRegEdit } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { ModalRef } from "../../template/modal/Modal";
import useStore from "../../../stores/Store";
import { Link, useNavigate } from "react-router-dom";

type SearchModalContentProps = {
  modalRef: React.RefObject<ModalRef | null>;
};

const SearchModalContent: React.FC<SearchModalContentProps> = ({
  modalRef,
}) => {
  const { chats } = useStore();
  const navigate = useNavigate();
  const [filterKey, setFilterKey] = useState("");

  return (
    <div className="bg-[#303030] w-[80%] md:w-[60%] lg:w-[40%] rounded-lg p-4">
      <div className="flex flex-row gap-2 border-b border-[#808080] pb-2 mb-2">
        <input
          type="text"
          onChange={(e) => {
            setFilterKey(e.target.value);
          }}
          className="w-full p-2 rounded-md bg-[#303030]  text-white outline-none"
          placeholder="Ara..."
        />
        <button
          className="cursor-pointer hover:bg-white/20 items-center justify-center w-10 h-10 p-2 rounded-sm group"
          onClick={() => {
            modalRef?.current?.close();
          }}
        >
          <LiaTimesSolid
            size={24}
            className="text-[#9B9B9B] group-hover:text-white transition-colors "
          />
        </button>
      </div>
      <div
        className="flex flex-col gap-2 overflow-y-auto h-[40vh]   [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-[#424242]"
      >
        <button
          onClick={() => {
            modalRef?.current?.close();
            navigate("/chat/new");
          }}
          className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm"
        >
          <FaRegEdit
            size={18}
            className="text-white group-hover:text-white transition-colors "
          />
          <span className="text-white">Yeni Sohbet</span>
        </button>

        <ul>
          {chats
            .filter((chat) => chat.roomName?.toLowerCase().includes(filterKey?.toLowerCase()))
            .map((chat, index) => (
              <li key={index}>
                <Link
                  to={`chat/${chat.roomId}`}
                  onClick={() => {
                    modalRef?.current?.close();
                  }}
                  className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm"
                >
                  <FaRegComments
                    size={18}
                    className="text-white group-hover:text-white transition-colors "
                  />
                  <span className="text-white">{chat.roomName}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchModalContent;
