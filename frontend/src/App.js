import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
import "./App.css";
import Login from "./components/login";

import "bootstrap/dist/css/bootstrap.min.css";
import ShowTools from "./components/DataComponents/showTools";
import ShowWorkers from "./components/DataComponents/showWorkers";
import ShowTransactions from "./components/DataComponents/showTransactions";
import HomePage from "./components/homePage";
import Inventory from "./components/inventory";
import ToolManager from "./components/toolManager";
import ExportData from "./components/exportData";
import NotFound from "./components/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/tools" element={<ShowTools />} />
        <Route path="/workers" element={<ShowWorkers />} />
        <Route path="/transactions" element={<ShowTransactions />} />
        <Route path="/inventory/*" element={<Inventory />} />
        <Route path="/toolmanager/:act" element={<ToolManager />} />
        <Route path="/export" element={<ExportData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
