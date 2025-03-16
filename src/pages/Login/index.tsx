import { useState } from "react";
import { handleSignUp } from "../../utils/userhelper";
import { getAllCollectionData } from "../../utils/firebasehelper";
import useStore, { UserData } from "../../stores";
import { toast } from "react-toastify";
import { generateMD5 } from "../../utils/helper";

export const Login = () => {
  const [formType, setformType] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginLoader, setLoginLoader] = useState(false);
  const { updateUser } = useStore();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoader(true); // Loader'ı her durumda aç

    
    if (formType === "login") {
      const existingUser = (await getAllCollectionData("users")).find(
        (user) => user.email === form.email && user.password === generateMD5(form.password)
      );

      if (existingUser) {
        toast.success("Giriş Başarılı", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        let userData: UserData = {
          id: existingUser.id,
          mail: existingUser.email,
          password: existingUser.password,
        };
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
        (u) => u.email === form.email
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

      let request = await handleSignUp(form.email, form.password);
      if (!request) {
        console.error("Kayıt başarısız");
      } else {
        let userData: UserData = {
          id: request.data.id,
          mail: form.email,
          password: form.password,
        };
        updateUser(userData);

        toast.success("Kayıt Başarılı", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    }

    setLoginLoader(false); // İşlem bitince loader'ı kapat
  };

  return (
    <div
      className="md:w-[60%] lg:w-[20%] md:h-[32rem] w-full h-full relative flex flex-col gap-5  bg-[#171717] rounded
    p-5
    "
    >
      <div>
        <h1 className="text-2xl text-white text-center">MEF YABEM</h1>
        <h1 className="text-3xl text-white text-center">CHAT APP</h1>
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
            onClick={() => setformType("register")}
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
          disabled={loginLoader} // Butonu devre dışı bırak
        >
          {loginLoader
            ? "Yükleniyor..."
            : formType === "login"
            ? "Giriş Yap"
            : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
};
