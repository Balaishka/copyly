import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultConfig,
} from "connectkit";

const root = ReactDOM.createRoot(document.getElementById("root"));
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    infuraId: "3d4fa646b2004b4186548a6931ef9d5a",
    walletConnectProjectId: "8cbf22bf383d44d0626e305ab9395a61",

    // Required
    appName: "Copyly",
  })
);
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
