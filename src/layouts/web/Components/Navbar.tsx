import { MdKeyboardArrowDown, MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
                <Link
                  to="/login"
                  className="block text-white py-2 px-1 hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/profile"
                  className="block text-white py-2 px-1 hover:bg-white/10 transition-colors"
                >
                  Hesabım
                </Link>
                <Link
                  to="/settings"
                  className="block text-white py-2 px-1 hover:bg-white/10 transition-colors"
                >
                  Ayarlar
                </Link>
                <Link
                  to="/logout"
                  className="block text-white py-2 px-1 hover:bg-white/10 transition-colors"
                >
                  Çıkış
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
