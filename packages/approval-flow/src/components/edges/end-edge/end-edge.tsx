import React from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "reactflow";

export const EndEdge = React.memo((props: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.data.source.position.y + 50,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  });

  const getEdgeColor = (status?: "error" | "warning" | "success") => {
    switch (status) {
      case "error":
        return "#FF3B30";
      case "warning":
        return "yellow";
      case "success":
        return "green";
      default:
        return "#ccc";
    }
  };

  return (
    <BaseEdge
      id={props.id}
      path={edgePath}
      markerEnd={props.markerEnd}
      style={{ stroke: getEdgeColor(props.data?.status) }}
    />
  );
});
