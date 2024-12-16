import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "@/layout";
import Home from "@/pages/home";
import Domain from "@/pages/domain";
import ProtectedRoute from "@/components/ProtectedRoute";
import Watched from "@/pages/watched";
import AccountMenu from "./components/AccountMenu";
import AccountSettings from "./pages/account/settings";
import Upgrade from "./pages/upgrade";
import { InsightsById } from "./pages/insights/id";
import Error from "./components/errors";
import { Insights } from "./pages/insights";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        errorElement: <Error />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/domain/:domainName",
            element: <Domain />,
          },
          {
            path: "/upgrade",
            element: <Upgrade />,
          },
          {
            path: "/account",
            element: <ProtectedRoute />,
            errorElement: <Error />,
            children: [
              {
                path: "/account",
                element: <AccountMenu />,
              },
              {
                path: "/account/insights/:id",
                element: <InsightsById />,
              },
              {
                path: "/account/insights",
                element: <Insights />,
              },
              {
                path: "/account/watched",
                element: <Watched />,
              },
              {
                path: "/account/settings",
                element: <AccountSettings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
