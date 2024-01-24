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
          nodeHeight={70}
          nodeWidth={260}
          data={data.data}
          direction={state}
          addEdgeCards={[]}
          sponsorProps={{ render: () => <span>nod</span> }}
        />
      </div>
    </div>
  );
};
