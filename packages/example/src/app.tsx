import "./app.css";

import { ApprovalFlow } from "approval-flow";
import React, { useState } from "react";

import data from "./data.json";

export const App = () => {
  const [state, setState] = useState<"TB" | "LR">("TB");

  return (
    <div className="App">
      <button onClick={() => setState("TB")}>TB</button>
      <button onClick={() => setState("LR")}>LR</button>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ApprovalFlow
          data={data.data}
          direction={state}
          sponsorProps={{ render: () => <span>nod</span> }}
        />
      </div>
    </div>
  );
};
