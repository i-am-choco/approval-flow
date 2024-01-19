import "./app.css";

import { ApprovalFlow } from "approval-flow";
import React, { useState } from "react";

import data from "./data.json";

export const App = () => {
  const [state, setState] = useState<"TB" | "LR">("LR");

  return (
    <div className="App">
      <button onClick={() => setState("TB")}>TB</button>
      <button onClick={() => setState("LR")}>LR</button>
      <ApprovalFlow data={data.data} direction={state} />
    </div>
  );
};
