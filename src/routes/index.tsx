import { createBrowserRouter } from "react-router-dom";
import { WebLayout } from "../layouts/web";
import { Home } from "../pages/Home/Home";

import { Room } from "../pages/Room";
import { LoginLayout } from "../layouts/login";
import { Login } from "../pages/Login";
import MyAccount from "../layouts/myAccount/MyAccount";

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
        path: "/room/:id",
        element: <Room />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);

export const loginRouter = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        // element: <Login />,
      },
    ],
  },
]);
