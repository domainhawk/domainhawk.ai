import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Domain from "./pages/domain";
import ProtectedRoute from "./components/ProtectedRoute";
import Watched from "./pages/watched";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        // errorElement: <RouteErrorHandler />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/domain/:uuid",
            element: <Domain />,
          },
          {
            path: "/watched",
            element: <Watched />,
          },
        ],
      },
    ],
  },
]);
