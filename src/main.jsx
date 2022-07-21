import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DayDetails } from "./pages/DayDetails";
import { DataProvider } from "../contexts/DataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path=":day" element={<DayDetails />} />
      </Routes>
    </BrowserRouter>
  </DataProvider>
);
