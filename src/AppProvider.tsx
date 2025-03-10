import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppProvider = () => {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />;
    </div>
  );
};
