import { createBrowserRouter } from "react-router-dom";
import { WebLayout } from "../layouts/web";
import { Home } from "../pages/Home/Home";

import { Room } from "../pages/Room";
import { LoginLayout } from "../layouts/login";
import { Login } from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/chat/new",
        element: <Home />,
      },
      {
        path: "/chat/:id",
        element: <Room />,
      },
    ],
  },
]);

export const loginRouter = createBrowserRouter([
  {
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path:"*",
        element: <Login />,
      }
    ],
  },
]);
