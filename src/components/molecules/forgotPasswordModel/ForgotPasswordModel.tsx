import React from "react";
import { ModalRef } from "../../template/modal/Modal";

type ForgotPasswordModalProps = {
  modalRef: React.RefObject<ModalRef | null>;
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ modalRef }) => {
  const [email, setEmail] = React.useState(""); // E-posta state'i

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Şifre sıfırlama işlemi burada gerçekleştirilebilir
    console.log("Şifre sıfırlama isteği gönderildi:", email);
    modalRef?.current?.close(); // İşlem tamamlandıktan sonra modal'ı kapat
  };

  return (
    <div className="bg-[#232323] p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Şifremi Unuttum</h2>
      <p className="mb-4">
        Şifrenizi sıfırlamak için lütfen kayıtlı e-posta adresinizi girin. Size
        şifre sıfırlama bağlantısı göndereceğiz.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => modalRef?.current?.close()}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            İptal
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordModal;
