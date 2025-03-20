import { Outlet } from "react-router-dom";

export const LoginLayout = () => {

  return (
    <>
      <div className="w-full flex-row  flex shrink-0 bg-[#2b2d31] ">
        <main className="flex flex-1 w-full shrink-0 flex-col  overflow-x-hidden h-screen relative items-center justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};
