import "../index.css";

import React from "react";
import { Handle, NodeProps } from "reactflow";
export const End = (props: NodeProps) => (
  <div className="approval-flow-card approval-flow-card-end">
    {props.targetPosition && (
      <Handle
        type="target"
        style={{ opacity: 0, marginTop: -4 }}
        position={props.targetPosition}
        isConnectable={false}
      />
    )}
    结束
  </div>
);
