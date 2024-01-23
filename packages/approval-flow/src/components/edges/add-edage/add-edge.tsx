import "../index.css";

import { Popover } from "antd";
import React, { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";

import { AddEdgeOptionsType, IAddEdgeProps } from "../../../types/index.types";
export const AddEdge = React.forwardRef((props: IAddEdgeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edgePath, labelX, labelY] = getSmoothStepPath(props.edge);

  const [open, setOpen] = useState<boolean>(false);

  const [formOpen, setFormOpen] = useState<boolean>(false);

  const [value, setValue] = useState<AddEdgeOptionsType | undefined>();

  const content = (
    <div className="add-edge-content">
      {props.cards.map((item, key) => (
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
    setFormOpen(false);
  };

  return (
    <>
      <BaseEdge id={props.edge.id} path={edgePath} />
      <EdgeLabelRenderer>
        <Popover
          content={content}
          open={open}
          trigger="click"
          placement="right"
        >
          <div
            className="add"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
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
        {value?.renderForm(formOpen, handleClose)}
      </EdgeLabelRenderer>
    </>
  );
});
