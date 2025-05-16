import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as ShadToaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Router from "./routes/Router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HotToaster position="top-center" />
        <ShadToaster richColors position="top-right" duration={1000} />
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
