import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LogoProvider } from "./components/LogoProvider";
import { AuthProvider } from "./contexts/AuthContext";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <LogoProvider>
          <App />
        </LogoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
