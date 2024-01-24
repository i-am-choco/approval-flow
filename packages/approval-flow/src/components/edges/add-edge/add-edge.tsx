import "../index.css";

import { Popover } from "antd";
import React, { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";

import { AddEdgeOptionsType, IAddEdgeProps } from "../../../types/index.types";
export const AddEdge = React.memo((props: IAddEdgeProps) => {
  const { edge, direction, cards, isCondition, onAdd } = props;

  const [edgePath, labelX, labelY] = getSmoothStepPath(edge);

  const isHorizontal = direction === "TB";

  const translateX = isHorizontal
    ? edge.sourceX
    : isCondition
      ? edge.sourceX + (labelX - edge.sourceX) / 2
      : labelX;

  const translateY = isHorizontal
    ? isCondition
      ? edge.sourceY + (labelY - edge.sourceY) / 2
      : labelY
    : edge.sourceY;

  const translateConditionX = direction === "TB" ? edge.sourceX : labelX;

  const translateConditionY = direction === "TB" ? labelY : edge.sourceY;

  const [open, setOpen] = useState<boolean>(false);

  const [formOpen, setFormOpen] = useState<boolean>(false);

  const [conditionFormOpen, setConditionFormOpen] = useState<boolean>(false);

  const [value, setValue] = useState<AddEdgeOptionsType | undefined>();

  const content = (
    <div className="add-edge-content">
      {cards.map((item, key) => (
        <div
          key={key}
          className="add-edge-title"
          style={{ background: item.color || "#ccc" }}
          onClick={() => {
            setOpen(false);
            setFormOpen(true);
            setValue(item);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );

  const handleClose = () => {
    formOpen && setFormOpen(false);
    conditionFormOpen && setConditionFormOpen(false);
  };

  return (
    <>
      <BaseEdge id={edge.id} path={edgePath} markerEnd={edge.markerEnd} />
      <EdgeLabelRenderer>
        <Popover
          content={content}
          open={open}
          trigger="click"
          placement="right"
        >
          <div
            className="add-edge"
            style={{
              transform: `translate(-50%, -50%) translate(${translateX}px,${translateY}px)`,
            }}
          >
            <svg
              viewBox="0 0 1024 1024"
              width="14px"
              height="14px"
              onClick={() => setOpen(true)}
            >
              <path
                d="M128 512a42.666667 42.666667 0 0 1 42.666667-42.666667h289.194666V180.138667a42.666667 42.666667 0 1 1 85.333334 0V469.333333h289.194666a42.666667 42.666667 0 0 1 0 85.333334h-289.194666v289.194666a42.666667 42.666667 0 1 1-85.333334 0V554.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667z"
                fill="#ccc"
              />
            </svg>
          </div>
        </Popover>
        {isCondition && (
          <div
            className={
              isHorizontal
                ? "condition-edge-horizon"
                : "condition-edge-vertical"
            }
            style={{
              transform: `translate(-50%, -50%) translate(${translateConditionX}px,${translateConditionY}px)`,
            }}
            onClick={() => setConditionFormOpen(true)}
          >
            Add Condition
          </div>
        )}
        {value?.renderForm(edge, formOpen, handleClose, onAdd)}
        {value?.renderConditionForm(
          edge,
          conditionFormOpen,
          handleClose,
          onAdd,
        )}
      </EdgeLabelRenderer>
    </>
  );
});
