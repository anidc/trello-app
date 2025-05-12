import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SettingsPage from "/src/pages/SettingsPage";
import RequireAuth from "./components/RequireAuth";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Unauthorized from "./pages/Unauthoirzed";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5",
    },
  },
  typography: {
    fontFamily: `'Plus Jakarta Sans', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
