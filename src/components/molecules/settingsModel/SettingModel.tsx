import React, { useState } from "react";
import { ModalRef } from "../../template/modal/Modal";
import { LiaTimesSolid } from "react-icons/lia";
import { MdAccountCircle, MdDelete } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import useStore from "../../../stores";

type SettingModalProps = {
  modalRef: React.RefObject<ModalRef | null>;
};

const SettingModel: React.FC<SettingModalProps> = ({ modalRef }) => {
  const { user, removeUser } = useStore();

  const [selectedSetting, setSelectedSetting] = useState("Hesap Bilgileri");
  const [deleteColor, _] = useState(true);
  const [changeTheme, setChangeTheme] = useState(false);
  const settingParts = [
    {
      id: "Hesap Bilgileri",
      icon: <IoMdSettings size={18} />,
      information: "Hesap Bilgileri",
    },
    {
      id: "Kişiselleştirme",
      icon: <MdAccountCircle size={18} />,
      information: "Kişiselleştirme",
    },
    {
      id: "Hesabı Sil",
      icon: <MdDelete size={18} />,
      information: "Hesabı Sil",
    },
  ];

  return (
    <div className="bg-[#303030]  sm:w-[90%] md:w-[60%]  lg:w-[50%] min-h-160 rounded-lg p-2 sm:p-4 ">
      <div className="flex flex-row gap-2 border-b border-[#808080] pb-2 mb-2 justify-between">
        <h1 className="font-bold text-lg lg:text-2xl">Ayarlar</h1>
        <button
          className="cursor-pointer hover:bg-white/20 items-center justify-center w-8 sm:w-10 h-8 sm:h-10 p-2 rounded-sm group"
          onClick={() => modalRef?.current?.close()}
        >
          <LiaTimesSolid
            size={20}
            className="text-[#9B9B9B] group-hover:text-white transition-colors"
          />
        </button>
      </div>

      <div className="flex gap-4 sm:gap-10 pt-5">
        {/* Sol Menü */}
        <div className="content-left flex-1 flex flex-col">
          {settingParts.map((item) => (
            <div
              key={item.id}
              className={`text-lg sm:text-xl cursor-pointer rounded-lg p-1 sm:p-2 transition-colors ${
                selectedSetting === item.id
                  ? "bg-[#424242]"
                  : "hover:bg-[#383838]"
              }`}
              onClick={() => setSelectedSetting(item.id)}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2 sm:text-[16px] md:text-lg">
                  {item.information}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sağ İçerik Bölümü */}
        <div className="content-right flex flex-col flex-4 w-full min-h-48">
          {selectedSetting === "Hesap Bilgileri" && (
            <div className="w-full min-h-40">
              <h2 className="sm:text-[16px] lg:text-lg font-bold mb-2">
                Hesap Bilgileri
              </h2>
              <div className="flex gap-2">
                <p className="font-semibold w-20 sm:w-24">Email:</p>
                {user ? (
                  <span>{user?.mail}</span>
                ) : (
                  <span>kullanıcı bulunamadı</span>
                )}
              </div>
              <div className="flex gap-2">
                <p className="font-semibold w-20 sm:w-24">Şifre:</p>
                {user ? (
                  <span>{user.password}</span>
                ) : (
                  <span>kullanıcı bulunamadı</span>
                )}
              </div>
            </div>
          )}

          {selectedSetting === "Kişiselleştirme" && (
            <div className="w-full min-h-40">
              <h2 className="sm:text-[14px] lg:text-lg font-bold mb-2">
                Kişiselleştirme
              </h2>
              {changeTheme ? (
                <span className="">aydınlık mod </span>
              ) : (
                <span className=""> karanlık mod </span>
              )}

              <span
                className="inline-block ml-2 cursor-pointer"
                onClick={() => setChangeTheme((prev) => !prev)}
              >
                {changeTheme ? (
                  <FaMoon className="" size={18} />
                ) : (
                  <FaSun size={18} />
                )}
              </span>
            </div>
          )}

          {selectedSetting === "Hesabı Sil" && (
            <div className="w-full min-h-40">
              <h2 className="text-lg sm:text-xl font-bold text-red-500 mb-2">
                Hesabı Sil
              </h2>
              <p>Hesabınızı silmek istediğinizden emin misiniz?</p>
              <button
                className={`${
                  deleteColor ? "bg-red-600" : "bg-blue-600"
                } text-white px-3 sm:px-4 py-1 sm:py-2 rounded mt-2 cursor-pointer`}
                onClick={() => {
                  removeUser();
                }}
              >
                Hesabı Sil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingModel;
