import "../index.css";

import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";

import { AddEdgeOptionsType, IAddEdgeProps } from "../../../types/index.types";
export const AddEdge = React.memo((props: IAddEdgeProps) => {
  const { edge, direction, isCondition } = props;

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

  const [value, setValue] = useState<AddEdgeOptionsType | undefined>();

  const nodeTypes: AddEdgeOptionsType[] = [
    {
      type: "Condition",
      title: "条件",
      color: "rgb(172, 226, 155)",
      renderForm: props.renderConditionForm,
    },
    {
      type: "ApproverNode",
      title: "审批人",
      color: "rgb(254, 188, 110)",
      renderForm: props.renderApproverForm,
    },
    {
      type: "CcRecipientNode",
      title: "抄送人",
      color: "rgb(248, 145, 138)",
      renderForm: props.renderConditionForm,
    },
  ];

  const content = (
    <div className="add-edge-content">
      {nodeTypes.map((item, key) => (
        <div
          key={key}
          className="add-edge-title"
          style={{ background: item.color || "#ccc" }}
          onClick={() => {
            setOpen(false);
            item.renderForm && setFormOpen(true);
            setValue(item);
          }}
        >
          {item.title}
        </div>
      ))}
      <div className="add-edge-close" onClick={() => setOpen(false)}>
        <CloseOutlined style={{ fontSize: 8 }} />
      </div>
    </div>
  );

  const handleClose = () => {
    formOpen && setFormOpen(false);
  };

  const handleConditionOpen = () => {
    setValue(nodeTypes[0]);
    nodeTypes[0].renderForm && setFormOpen(true);
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
            <PlusCircleOutlined
              onClick={() => setOpen(true)}
              style={{ background: "#fff", borderRadius: "50%" }}
            />
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
            onClick={handleConditionOpen}
          >
            添加条件
          </div>
        )}
        {value?.renderForm && value.renderForm(edge, formOpen, handleClose)}
      </EdgeLabelRenderer>
    </>
  );
});
