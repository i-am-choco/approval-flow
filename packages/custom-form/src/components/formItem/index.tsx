import "./index.css";

import { CloseOutlined } from "@ant-design/icons";
import * as R from "ramda";
import React from "react";

import { FormComponentType, FormItemConfigType } from "../../types/index.types";
import { getForm } from "../components";
interface IFormItemProps {
  brother: FormItemConfigType<any>[];
  current: FormItemConfigType<any>;
  draggingId: string | null;
  componentList: FormComponentType[];
  onChange: (value: FormItemConfigType<any>[]) => void;
  onChangeDraggingId: (id: string | null) => void;
}
export const FormItem = React.memo((props: IFormItemProps) => {
  const {
    brother,
    current,
    draggingId,
    componentList,
    onChange,
    onChangeDraggingId,
  } = props;

  const { id, type, children, droppable } = current;

  // 拖拽游标为禁用
  const handleCursorNotAllowed = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "not-allowed";
    }
  };

  // 拖拽游标为抓手
  const handleCursorGrabbing = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "grabbing";
    }
  };

  const handleAdd = (currentIndex: number, isChildren: boolean) => {
    const config = componentList.find((item) => item.id === draggingId);

    if (!config) {
      throw new Error(
        "Can't not find that component.Please check whether is exit.",
      );
    }

    const id = crypto.randomUUID().toString().replace(/-/g, "");

    const result = R.insert(
      currentIndex,
      {
        id,
        type: config.type,
        droppable: config.droppable,
        rule: {
          id,
          label: config.data?.title?.join("-") || config.title,
          ...config.data,
        },
      },
      (isChildren ? children : brother) || [],
    );

    onChangeDraggingId(id);

    isChildren ? handleChildrenChange(result) : onChange(result);
  };

  const handleMove = (toIndex: number, isChildren: boolean) => {
    const formIndex = R.findIndex((value) => value.id === draggingId, brother);

    const result = R.move(
      formIndex,
      toIndex,
      (isChildren ? children : brother) || [],
    );

    isChildren ? handleChildrenChange(result) : onChange(result);
  };

  const handleDrop = (
    isChildren: boolean,
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    if (isChildren && !droppable) return;
    const list = (isChildren ? children : brother) || [];

    const currentIndex = R.findIndex((item) => item.id === id, list);

    if (brother.some((item) => item.id === draggingId)) {
      handleMove(currentIndex, isChildren);
    } else if (componentList.some((item) => item.id === draggingId)) {
      handleAdd(currentIndex, isChildren);
    }
  };

  const handleChildrenChange = (children: FormItemConfigType<any>[]) => {
    const item = { ...current, children };

    const result = brother.map((value) => (value.id === id ? item : value));

    onChange(result);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onChangeDraggingId(id);
  };

  const handleDragOver = () =>
    droppable ? handleCursorGrabbing() : handleCursorNotAllowed();

  const handleDelete = () => {
    onChange(brother.filter((item) => item.id !== current.id));
  };

  return (
    <div
      id={id}
      draggable
      className={`custom-form-item ${draggingId === id ? "custom-form-item-selected" : ""}`}
      onMouseDown={handleMouseDown}
      onDrop={(e) => handleDrop(false, e)}
      onDragStart={handleCursorGrabbing}
    >
      {draggingId === id && (
        <CloseOutlined
          className={"custom-form-item-delete"}
          onClick={handleDelete}
        />
      )}
      {getForm(type, { rule: current.rule })}
      <div
        id={`${id}-children`}
        onDrop={(e) => handleDrop(true, e)}
        onDragOver={handleDragOver}
      >
        {children?.map((item) => (
          <FormItem
            {...props}
            key={item.id}
            current={item}
            brother={children}
            onChange={handleChildrenChange}
          />
        ))}
        {droppable && (
          <div className="custom-form-component-list-drag-tips">
            拖拽控件到此处
          </div>
        )}
      </div>
      {current.type === "List" && <div>添加</div>}
    </div>
  );
});
