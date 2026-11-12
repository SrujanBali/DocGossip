// eslint-disable-next-line no-unused-vars
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter } from "react-router";
// eslint-disable-next-line no-unused-vars
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="srujanbali.us.auth0.com"
        clientId="wyADlOYukuN0rudIcox5tG9cN6WH7M40"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://docgossip-api",
          scope: "openid profile email",
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>,
);
