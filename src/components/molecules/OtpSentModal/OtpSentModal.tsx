import { useState } from "react";

type Props = {
  onClose: () => void;
  callback: (otp: string) => void
};

const OtpSentModal: React.FC<Props> = ({ onClose, callback }) => {
  const [otp, setOtp] = useState("");
  return (
    <div className="bg-[#2B2D31] text-white rounded-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[25%] p-6 shadow-2xl flex flex-col items-center gap-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-lg"
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold text-center">OTP Kodu Gönderildi</h2>
      <p className="text-sm text-center text-gray-300">
        Girdiğin e-posta adresine bir OTP (tek kullanımlık şifre) gönderildi.
        Lütfen e-posta kutunu kontrol et ve aşağıya kodu gir.
      </p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP Kodunu Giriniz"
        className="bg-[#1E1E1E] text-white text-sm rounded-md w-full p-2.5 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#7289DA]"
      />

      <button
        onClick={() => callback(otp)}
        className="bg-[#7289DA] text-white rounded-md w-full p-2.5 mt-2"
      >
        Gönder
      </button>
    </div>
  );
};

export default OtpSentModal;
