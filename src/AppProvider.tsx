import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./context/Context";
export const AppProvider = () => {
  return (
    <>
      <SearchProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
};
