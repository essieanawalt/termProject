import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.css";
import App from "./App";

// BrowserRouter lives here so the whole app has access to routing
// StrictMode runs everything twice in development to catch bugs —- doesn't affect production
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
