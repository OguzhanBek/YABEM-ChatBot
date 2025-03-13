import { RouterProvider } from "react-router-dom";
import { loginRouter, router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStore from "./stores";

export const AppProvider = () => {
  const { user } = useStore();

  return (
    <>
      <RouterProvider
        key={user ? "authenticated" : "unauthenticated"}
        router={user ? router : loginRouter}
      />
      <ToastContainer />
    </>
  );
};
