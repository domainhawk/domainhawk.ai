import { ColorModeProvider } from "@/components/ui/color-mode";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router.tsx";
import AuthContextProvider from "@/components/auth/AuthContextProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="domainhawk-ai.us.auth0.com"
        clientId="rmQw9aNjQznL3dOYkP6GHz5U6GRqm2PW"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Provider>
          <AuthContextProvider>
            <HelmetProvider>
              <ColorModeProvider>
                <Toaster />
                <RouterProvider router={router} />
              </ColorModeProvider>
            </HelmetProvider>
          </AuthContextProvider>
        </Provider>
      </Auth0Provider>
    </QueryClientProvider>
  </StrictMode>
);
