import "./app.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Demo } from "./demo/demo";
import { Flow } from "./demo/flow";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/flow/:id" element={<Flow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
