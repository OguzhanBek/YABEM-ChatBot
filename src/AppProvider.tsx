import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
<<<<<<< HEAD
import { ToastContainer} from "react-toastify";
=======
import { ToastContainer } from "react-toastify";
>>>>>>> 1361d127610dcc33a0f2ce1bb2b4ebee7287648c
import "react-toastify/dist/ReactToastify.css";

export const AppProvider = () => {
  return (
<<<<<<< HEAD
    <div className=" tutaaaaaaaaaaaaaaaa">
      <ToastContainer />
      <RouterProvider router={router} />;
      
    </div>
=======
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
>>>>>>> 1361d127610dcc33a0f2ce1bb2b4ebee7287648c
  );
};
