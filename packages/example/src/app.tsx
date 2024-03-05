import "./app.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Demo } from "./demo/demo";
import { Flow } from "./demo/flow";
import { Form } from "./demo/form";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
          <Route path="/flow/:id" element={<Flow />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
