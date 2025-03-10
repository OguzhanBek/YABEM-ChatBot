import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppProvider = () => {
  return (
    <div className=" tutaaaaaaaaaaaaaaaa">
      <ToastContainer />
      <RouterProvider router={router} />;
      
    </div>
  );
};
