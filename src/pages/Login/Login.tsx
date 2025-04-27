import { useRef, useState } from "react";
import { handleSignUp } from "../../utils/userhelper";
import {
  checkUser,
  getAllCollectionData,
  updateUserById,
} from "../../utils/firebasehelper";
import useStore, { UserData } from "../../stores/Store";
import { toast } from "react-toastify";
import { generateMD5 } from "../../utils/helper";
import axios from "axios";
import Modal, { ModalRef } from "../../components/template/modal/Modal";
import OtpSentModal from "../../components/molecules/OtpSentModal/OtpSentModal";

type OTPSentModalProps = {
  otpModalRef: React.RefObject<ModalRef | null>;
};

export const Login: React.FC<OTPSentModalProps> = () => {
  const otpModalRef = useRef<ModalRef>(null);
  const [otp] = useState("");

  const [formType, setformType] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginLoader, setLoginLoader] = useState(false);
  const { updateUser } = useStore();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoader(true);

    if (!isValidEmail(form.email)) {
      console.log("Hatalı e-posta formatı!");
      alert("lütfen geçerli formatta email giriniz");
      setLoginLoader(false);
      return;
    }

    if (formType === "login") {
      const existingUser = (await getAllCollectionData("users")).find(
        (user) =>
          user.email === form.email &&
          user.password === generateMD5(form.password)
      );

      if (existingUser) {
        // şuraya bak
        toast.success("Giriş Başarılı", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });

        let userData: UserData = {
          id: existingUser.id,
          mail: existingUser.email,
          password: existingUser.password,
          otp: existingUser.otp,
          active: existingUser.active,
        };

        if (!userData.active) {
          otpModalRef.current?.open();
          return;
        }
        updateUser(userData);
      } else {
        toast.error("Kullanıcı bilgileri hatalı", {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        });
      }
    } else if (formType === "register") {
      const existingUser = (await getAllCollectionData("users")).find(
        (user) =>
          user.email === form.email &&
          user.password === generateMD5(form.password)
      );

      if (existingUser) {
        toast.error("Bu mail zaten kullanılıyor", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        setLoginLoader(false); // Kullanıcı varsa loader'ı kapat
        return;
      }

      try {
        const request = await handleSignUp(form.email, form.password); //OTP kodu burada database'e gönderiliyor.

        if (!request) {
          console.error("Kayıt başarısız");
          toast.error("Kayıt başarısız", {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });
          return;
        }
        const response = await axios.post("http://localhost:5000/send-email", {
          form: form.email,
          otp: request.data.otp,
        });
        console.log(response);
        if (request.data.otp === otp) {
          request.data.active = true;
          updateUser(request.data as UserData);
        }

        otpModalRef.current?.open();
      } catch (error: any) {
        console.error("Hata oluştu:", error);

        toast.error(
          "Bir hata oluştu: " + (error.response?.data?.error || error.message),
          {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          }
        );
      }
    }

    setLoginLoader(false); // İşlem bitince loader'ı kapat
  };

  return (
    <>
      <div className="sm:w-[60%] md:w-[50%] lg:w-[32%] xl:w-[27%] sm:h-[32rem] w-full h-full relative flex flex-col gap-5 bg-[#171717] rounded p-5 shadow-2xl shadow-[#7289DA]/50 ">
        <div>
          <h1 className="text-2xl text-white text-center">MEF YABEM</h1>
          <h1 className="text-3xl text-white text-center">CHAT BOT</h1>
        </div>

        <div className="flex flex-col gap-3 p-5 items-center">
          <div className="flex flex-row gap-3 w-full">
            <button
              className={`w-1/2 py-2 text-white ${
                formType === "login" ? "bg-[#7289DA]" : "bg-[#171717]"
              } rounded min-w-[6rem]`}
              onClick={() => setformType("login")}
            >
              Giriş Yap
            </button>
            <button
              className={`w-1/2 py-2 text-white ${
                formType === "register" ? "bg-[#7289DA]" : "bg-[#171717]"
              } rounded min-w-[6rem]`}
              onClick={() => {
                setformType("register");
              }}
            >
              Kayıt Ol
            </button>
          </div>
        </div>

        <form onSubmit={handleForm} className="p-4 flex flex-col gap-3">
          <div>
            <label className="block mb-2 text-sm font-medium ">
              Email Adresi
            </label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              type="email"
              className="bg-[#2B2D31] text-white  text-sm rounded-lg   block w-full p-2.5"
              placeholder="Email Adresi"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium ">Şifre</label>
            <input
              value={form.password}
              onChange={(e) =>
                setForm((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              type="password"
              className="bg-[#2B2D31] text-white  text-sm rounded-lg   block w-full p-2.5"
              placeholder="Şifre"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-[#7289DA] text-white rounded-lg w-full p-2.5 mt-5 cursor-pointer ${
              loginLoader ? "opacity-80 cursor-not-allowed" : ""
            }`}
            disabled={loginLoader}
          >
            {loginLoader
              ? "Yükleniyor..."
              : formType === "login"
              ? "Giriş Yap"
              : "Kayıt Ol"}
          </button>
        </form>
      </div>

      <Modal ref={otpModalRef}>
        <OtpSentModal
          onClose={() => otpModalRef.current?.close()}
          callback={(otp) => {
            checkUser(form.email, form.password).then((response) => {
              if (response) {
                if (response.otp === otp) {
                  let userData: UserData = {
                    id: response.id,
                    mail: form.email,
                    password: response.password,
                    otp: response.otp,
                    active: true,
                  };

                  updateUserById(response.id, userData);

                  updateUser(userData);
                } else {
                  alert(JSON.stringify(response));
                }
              }
            });
          }}
        />
      </Modal>
    </>
  );
};
