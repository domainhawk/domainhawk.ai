import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HelmetProvider>
          <ColorModeProvider>
            <RouterProvider router={router} />
          </ColorModeProvider>
        </HelmetProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
