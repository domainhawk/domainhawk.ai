import ProtectedRoute from "@/components/ProtectedRoute";
import SiteLayout from "@/layout";
import Domain from "@/pages/domain";
import Home from "@/pages/home";
import Watched from "@/pages/watched";
import { createBrowserRouter } from "react-router-dom";
import AccountMenu from "./components/AccountMenu";
import Error from "./components/errors";
import AccountSettings from "./pages/account/settings";
import { Insights } from "./pages/insights";
import { InsightsById } from "./pages/insights/id";
import Upgrade from "./pages/upgrade";
import WatchedById from "./pages/watched/id";
import Signup from "./pages/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/upgrade",
        element: <Upgrade />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/domain/:domainName",
            element: <Domain />,
          },
          {
            path: "/account",
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
                path: "/account/watched/:id",
                element: <WatchedById />,
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
