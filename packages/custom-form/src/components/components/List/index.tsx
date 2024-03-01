import "./index.css";

import * as R from "ramda";
import React from "react";

import { IRenderFormProps } from "../../../types/index.types";
import { COMPONENTS, getFormItem } from "..";

export const List = React.memo((props: IRenderFormProps<any>) => {
  const { draggingId, children, onChangeDraggingId, onChildrenChange } = props;

  const handleAdd = (currentIndex: number) => {
    const config = COMPONENTS.find((item) => item.customFormId === draggingId);

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
        customFormId: `custom-form-list-${(children || []).length}`,
        type: config.type,
        droppable: config.droppable,
        rule: { id, name: config.title },
      },
      children || [],
    ).map((item, index) => ({
      ...item,
      customFormId: `custom-form-list-${index}}`,
    }));

    onChildrenChange && onChildrenChange(result);
    onChangeDraggingId &&
      onChangeDraggingId(
        R.pathOr(null, [currentIndex, "customFormId"], result),
      );
  };

  const handleMove = (toIndex: number) => {
    const formIndex = R.findIndex(
      (value) => value.customFormId === draggingId,
      children || [],
    );

    const result = R.move(formIndex, toIndex, children || []).map(
      (item, index) => ({
        ...item,
        customFormId: `custom-form-${index}`,
      }),
    );

    onChangeDraggingId &&
      onChangeDraggingId(R.pathOr(null, [toIndex, "customFormId"], result));
    onChildrenChange && onChildrenChange(result);
  };

  const handleListDrop = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    if (COMPONENTS.some((item) => item.customFormId === draggingId)) {
      handleAdd(-1);
    }
    if (children?.some((item) => item.customFormId === draggingId)) {
      handleMove(-1);
    }
  };

  const hanldeDragStart = (id: string) => {
    onChangeDraggingId && onChangeDraggingId(id);
    handleCursorGrabbing();
  };

  // 拖拽游标为抓手
  const handleCursorGrabbing = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "grabbing";
    }
  };

  const handleDragOver = (
    droppable: boolean,
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    droppable ? handleCursorGrabbing() : handleCursorNotAllowed();
  };

  // 拖拽游标为禁用
  const handleCursorNotAllowed = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "not-allowed";
    }
  };

  const handleDrop = (
    id: string,
    droppable: boolean,
    e: React.DragEvent<HTMLElement>,
  ) => {
    e.stopPropagation();
    if (!droppable || !draggingId) return;
    const currentIndex = R.findIndex(
      (value) => value.customFormId === id,
      children || [],
    );

    if (COMPONENTS.some((item) => item.customFormId === draggingId)) {
      handleAdd(currentIndex);
    }
    if (children?.some((item) => item.customFormId === draggingId)) {
      handleMove(currentIndex);
    }
  };

  return (
    <div className="custom-form-component-list">
      <p>列表</p>
      <div
        className="custom-form-component-list-children"
        onDrop={handleListDrop}
      >
        {children?.map((item) => (
          <div
            key={item.id}
            className={`custom-form-item ${draggingId === item.customFormId ? "custom-form-item-selected" : ""}`}
            draggable
            id={item.customFormId}
            onDrop={(e) => handleDrop(item.customFormId, item.droppable, e)}
            onDragOver={(e) => handleDragOver(item.droppable, e)}
            onDragStart={(e) => {
              e.stopPropagation();
              hanldeDragStart(item.customFormId);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              onChangeDraggingId && onChangeDraggingId(item.customFormId);
            }}
          >
            {getFormItem(item.type, { rule: item.rule })}
          </div>
        ))}
        <div className="custom-form-component-list-drag-tips">
          拖拽控件到此处
        </div>
      </div>
    </div>
  );
});
