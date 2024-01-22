import "./index.css";

import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from "reactflow";
export const AddEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY, offsetX] = getSmoothStepPath(props);

  return (
    <>
      <BaseEdge id={props.id} path={edgePath} style={props.style} />
      <EdgeLabelRenderer>
        <div
          className="add"
          style={
            offsetX
              ? { display: "none" }
              : {
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                }
          }
        >
          <svg viewBox="0 0 1024 1024" width="14px" height="14px">
            <path
              d="M128 512a42.666667 42.666667 0 0 1 42.666667-42.666667h289.194666V180.138667a42.666667 42.666667 0 1 1 85.333334 0V469.333333h289.194666a42.666667 42.666667 0 0 1 0 85.333334h-289.194666v289.194666a42.666667 42.666667 0 1 1-85.333334 0V554.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667z"
              fill="#ccc"
            />
          </svg>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
