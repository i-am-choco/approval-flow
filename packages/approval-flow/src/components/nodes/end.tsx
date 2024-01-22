import "./index.css";

import React from "react";
import { Handle, NodeProps } from "reactflow";
export const End = (props: NodeProps) => (
  <div className="card end">
    {props.targetPosition && (
      <Handle
        type="target"
        position={props.targetPosition}
        isConnectable={false}
      />
    )}
    End
  </div>
);
