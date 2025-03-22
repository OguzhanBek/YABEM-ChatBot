import { RouterProvider } from "react-router-dom";
import { loginRouter, router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStore from "./stores/Store";
import { useEffect } from "react";

export const AppProvider = () => {
  const { user, theme } = useStore();
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

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
