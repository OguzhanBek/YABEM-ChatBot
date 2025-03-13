import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal, { ModalRef } from "../../../components/template/modal/Modal";
import SettingModel from "../../../components/molecules/settingsModel/SettingModel";
import { deleteCollectionData } from "../../../utils/firebasehelper";
import useStore from "../../../stores";
export const Navbar = () => {
  const modelRef = useRef<ModalRef>(null);
  const { logout } = useStore();
  const navigate = useNavigate();
  return (
    <div className="w-full relative flex flex-row p-4 justify-between border-b border-[#1e2124] h-12 items-center gap-2">
      <div className="text-white text-2xl font-bold block md:hidden">
        <button
          className="cursor-pointer hover:bg-white/20 items-center justify-center w-10 h-10 p-2 rounded-sm group"
          onClick={() => {
            document.getElementById("menu")?.classList.toggle("menu-active");
          }}
        >
          <MdOutlineSpaceDashboard className="text-[#9B9B9B] group-hover:text-white transition-colors " />
        </button>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h1 className="font-bold text-lg">MEF YABEM CHAT BOT v1</h1>
        <MdKeyboardArrowDown size={22} />
      </div>
      <div>
        <div className="group">
          <button className="cursor-pointer items-center justify-center w-10 h-10 rounded-sm group">
            <img
              src="https://i.pinimg.com/originals/51/a3/aa/51a3aa8dd76f874d2596e067213cd15b.jpg"
              alt="zabuzapp"
              className="w-10 h-10 rounded-full"
            />
          </button>
          <div
            className="absolute top-12 right-0 bg-[#303030] w-60 p-2 rounded-md hidden
            group-focus-within:block  transition-all duration-300 z-10"
            id="menux"
          >
            <ul>
              <li>
                <button
                  onClick={() => modelRef.current?.open()}
                  className="block text-white cursor-pointer w-full text-left  py-2 px-1 hover:bg-white/10 transition-colors"
                >
                  Ayarlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                  className="block text-white py-2 px-1 hover:bg-white/10 transition-colors w-full text-left"
                >
                  Çıkış
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal ref={modelRef}>
        <SettingModel modalRef={modelRef} />
      </Modal>
    </div>
  );
};
