import { useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  const changePassword =()=>{
    alert("şifre değiştir")
  }
  return (
    <div className="w-3xl bg-[#2F2F2F] absolute translate z-10 h-6/12 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-center">
      <header className="border-b-1 h-15">
        <div className="flex flex-row  justify-between mt-5">
          <h2 className="ml-7 ">Hesap Bilgileri</h2>
          <span
            onClick={returnHome}
            className="w-10 h-10 cursor-pointer mr-5 rounded-full text-white hover:bg-[#676767] flex justify-center items-center"
          >
            X
          </span>
        </div>
      </header>
      <main className="flex flex-row mt-10">
        <div className="w-[80%] m-auto h-full">
          <div className=" flex flex-row justify-center gap-30">
            <span className="w-30 text-start ">Email :</span>
            <span className="w-60">Kullanıcı bilgisi gelecek</span>
          </div>
          <div className=" flex flex-row justify-center mt-2  gap-30 ">
            <span className="w-30 text-start">Şifre : </span>
            <span className="w-60">Kullanıcı bilgisi gelecek</span>
          </div>
          <div className=" flex flex-row justify-center mt-2 gap-30 text-start">
            <span onClick={changePassword} className="w-30 text-start cursor-pointer hover:opacity-75">
              Şifre değiştir
            </span>
            <span className="w-60"></span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyAccount;
