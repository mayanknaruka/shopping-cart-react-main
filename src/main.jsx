import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import routes from "./components/Routes";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="main-page">
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
);
