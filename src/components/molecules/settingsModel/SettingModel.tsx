import React, { useEffect, useState } from "react";
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
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

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
    <div className="bg-[#303030] sm:w-[90%] md:w-[60%] lg:w-[50%] min-h-160 rounded-lg p-2 sm:p-4">
      {/* Üst Başlık */}
      <div className="flex flex-row gap-2 border-b border-[#808080] pb-2 mb-2 justify-between">
        <h1 className="font-bold text-lg lg:text-2xl">Ayarlar</h1>
        <button
          className="cursor-pointer hover:bg-white/20 items-center justify-center w-8 sm:w-10 h-8 sm:h-10 p-2 rounded-sm group"
          onClick={() => modalRef.current?.close()}
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
              <div className="flex items-center  ">
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
              <p className="font-semibold w-20 sm:w-24"></p>
              {user ? (
                <span
                  className="text-blue-400 underline cursor-pointer hover:text-blue-600"
                  onClick={() => modalRef.current?.open()} // Modal'ı aç
                >
                  Şifremi unuttum.
                </span>
              ) : (
                <span>Kullanıcı bulunamadı</span>
              )}
            </div>
          )}

          {selectedSetting === "Kişiselleştirme" && (
            <div className="w-full min-h-40">
              <h2 className="sm:text-[14px] lg:text-lg font-bold mb-2">
                Kişiselleştirme
              </h2>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300/20 w-fit rounded"
                onClick={toggleTheme}
              >
                <span className="">
                  {theme === "dark" ? "Karanlık Mod" : "Aydınlık Mod"}
                </span>
                <button className="cursor-pointer">
                  {theme === "dark" ? (
                    <FaMoon size={18} />
                  ) : (
                    <FaSun size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

          {selectedSetting === "Hesabı Sil" && (
            <div className="w-full min-h-40">
              <h2 className="text-lg sm:text-xl font-bold text-red-500 mb-2">
                Hesabı Sil
              </h2>
              <p>Hesabınızı silmek istediğinizden emin misiniz?</p>
              <button
                className={`hover:bg-red-800 transition-colors bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded mt-2 cursor-pointer`}
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
