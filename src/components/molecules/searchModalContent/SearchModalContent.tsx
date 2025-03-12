import React from "react";
import { FaRegComments, FaRegEdit } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { ModalRef } from "../../template/modal/Modal";

type SearchModalContentProps = {
  modalRef: React.RefObject<ModalRef | null>;
};

const SearchModalContent: React.FC<SearchModalContentProps> = ({
  modalRef,
}) => {
  return (
    <div className="bg-[#303030] w-[30%]  rounded-lg p-4">
      <div className="flex flex-row gap-2 border-b border-[#808080] pb-2 mb-2">
        <input
          type="text"
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
      <div>
        <div className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm">
          <FaRegEdit
            size={18}
            className="text-white group-hover:text-white transition-colors "
          />
          <span className="text-white">Yeni Sohbet</span>
        </div>

        <ul>
          <li>
            <div className="flex flex-row px-4 py-2 items-center rounded-sm hover:bg-white/10 w-full gap-2 cursor-pointer text-sm">
              <FaRegComments
                size={18}
                className="text-white group-hover:text-white transition-colors "
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
                className="text-white group-hover:text-white transition-colors "
              />
              <span className="text-white">
                Zustand React TypeScript Kurulumu
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchModalContent;
