import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./polyfills.ts";
import "./index.css";

import App from "./App.tsx";
import DappContextProvider from "./contextProviders/DappContextProvider.tsx";
import {
  setNetworkId,
  type NetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import pino from "pino";
import MidnightWalletProvider from "./contextProviders/MidnightWalletProvider.tsx";

const networkId = import.meta.env.VITE_NETWORK_ID as NetworkId;
setNetworkId(networkId);

export const logger = pino({
  level: import.meta.env.VITE_LOGGING_LEVEL as string,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DappContextProvider>
      <MidnightWalletProvider logger={logger}>
        <App />
      </MidnightWalletProvider>
    </DappContextProvider>
  </StrictMode>
);
