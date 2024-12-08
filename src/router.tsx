import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import Domain from "./pages/domain";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        // element: <ProtectedRoute />,
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
        ],
      },
    ],
  },
]);
