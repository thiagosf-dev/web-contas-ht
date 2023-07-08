import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export const router = createBrowserRouter(routes);