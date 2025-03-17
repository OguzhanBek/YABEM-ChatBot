import React, { useState } from "react";
import Modal, { ModalRef } from "../../template/modal/Modal";
import { LiaTimesSolid } from "react-icons/lia"; // Kapatma ikonu
import useStore from "../../../stores/Store";
import { updateUserById } from "../../../utils/firebasehelper";
import { toast } from "react-toastify";
import { generateMD5 } from "../../../utils/helper";

type ChangePasswordModalProps = {
  modalRef: React.RefObject<ModalRef | null>;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  modalRef,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Şifreler eşleşmiyorsa hata göster
    if (newPassword !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    const generatedPssword = generateMD5(confirmPassword);
    // Kullanıcı bilgilerini güncelle
    if (user) {
      alert(user);
      const isUpdated = await updateUserById(user.id, {
        password: generatedPssword, 
        email: user.mail, 
      });

      if (isUpdated) {
        toast.success("Şifre başarıyla güncellendi!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.error("Şifre güncelleme başarısız!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } else {
      toast.error("Kullanıcı bulunamadı!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };
  return (
    <Modal ref={modalRef}>
      <div className="bg-[#303030] w-[90%] md:w-[60%] lg:w-[50%] min-h-160 rounded-lg p-4 relative">
        <button
          className="absolute top-2 right-2 cursor-pointer hover:bg-white/20 p-1 rounded-sm"
          onClick={() => modalRef.current?.close()} // Modalı kapat
        >
          <LiaTimesSolid
            size={20}
            className="text-[#9B9B9B] hover:text-white transition-colors"
          />
        </button>

        {/* Modal İçeriği */}
        <h2 className="font-bold text-lg lg:text-2xl mb-4">Şifre Değiştir</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword">Yeni Şifre</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 rounded bg-[#424242] text-white"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Yeni Şifre Tekrar</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded bg-[#424242] text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Şifreyi Değiştir
          </button>
        </form>
      </div>
    </Modal>
  );
};
export default ChangePasswordModal;
