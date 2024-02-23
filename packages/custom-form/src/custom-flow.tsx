import "./index.css";

import { InputNumber } from "antd";
import * as R from "ramda";
import React, { useRef, useState } from "react";

import { compoents, getFormItem } from "./compoents";
import { FormItemConfigType } from "./types/index.types";
export const CustomForm = React.memo(() => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [x, setX] = useState<number>(375);

  const [y, setY] = useState<number>(600);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormItemConfigType[]>([]);

  // 拖拽游标为抓手
  const handleCursorGrabbing = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "grabbing";
    }
  };

  // 拖拽游标为禁用
  const handleCursorNotAllowed = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "not-allowed";
    }
  };

  /** --------------------------  画布事件处理  -------------------------- */

  const handleCanvasDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleCursorGrabbing();
  };

  const handleCanvasDrop = () => {
    if (form.every((item) => item.customFormId !== draggingId)) {
      // 新增组件
      setForm([
        ...form,
        {
          id: crypto.randomUUID(),
          customFormId: `custom-form-${form.length}`,
          type: "Input",
          droppable: true,
        },
      ]);
      setDraggingId(`custom-form-${form.length}`);
    } else if (form.some((item) => item.customFormId === draggingId)) {
      // 当前组件移动到画布的最后
      const index = R.findIndex(
        (value) => value.customFormId === draggingId,
        form,
      );

      const result = R.move(index, -1, form);

      setForm(
        result.map((item, index) => ({
          ...item,
          customFormId: `custom-form-${index}`,
        })),
      );
      setDraggingId(`custom-form-${form.length - 1}`);
    }
  };

  /** --------------------------  组件库组件事件处理  -------------------------- */
  const handleComponentDragStart = (id: string) => {
    setDraggingId(id);
    handleCursorGrabbing();
  };

  /** --------------------------  画布组件事件处理  -------------------------- */

  const handleDrop = (
    id: string,
    droppable: boolean,
    e: React.DragEvent<HTMLElement>,
  ) => {
    e.stopPropagation();
    if (!droppable || !draggingId) return;
    if (form.every((item) => item.customFormId !== draggingId)) {
      // 新增组件
      const currentIndex = R.findIndex(
        (value) => value.customFormId === id,
        form,
      );

      const result = R.insert(
        currentIndex,
        {
          id: crypto.randomUUID(),
          customFormId: `custom-form-${form.length}`,
          type: "Input",
          droppable: true,
        },
        form,
      );

      setForm(
        result.map((item, index) => ({
          ...item,
          customFormId: `custom-form-${index}`,
        })),
      );
      setDraggingId(`custom-form-${currentIndex}`);
    } else if (form.some((item) => item.customFormId === draggingId)) {
      // 移动组件模块，组件内部组件不接收处理
      const currentIndex = R.findIndex(
        (value) => value.customFormId === id,
        form,
      );

      const index = R.findIndex(
        (value) => value.customFormId === draggingId,
        form,
      );

      const result = R.move(index, currentIndex, form);

      setForm(
        result.map((item, index) => ({
          ...item,
          customFormId: `custom-form-${index}`,
        })),
      );
      setDraggingId(`custom-form-${currentIndex}`);
    }
  };

  const handleDragOver = (
    droppable: boolean,
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    droppable ? handleCursorGrabbing() : handleCursorNotAllowed();
  };

  const hanldeDragStart = (id: string) => {
    setDraggingId(id);
    handleCursorGrabbing();
  };

  return (
    <div className="custom-form-layout">
      <div className="left-sider">
        {compoents.map((item) => {
          return (
            <div
              key={item.type}
              id={item.id}
              draggable
              style={{ cursor: "grab" }}
              onDragStart={() => handleComponentDragStart(item.id)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="main">
        <div className="header">
          <span style={{ marginLeft: 8 }}>画布x宽度：</span>
          <InputNumber
            value={x}
            onChange={(value) => setX(value || 0)}
            max={800}
          />
          <span style={{ marginLeft: 8 }}>画布y宽度：</span>
          <InputNumber
            key="y"
            value={y}
            onChange={(value) => setY(value || 0)}
          />
        </div>
        <div
          id="custom-form-canvas"
          className="canvas"
          style={{ width: x, height: y }}
          onDragLeave={handleCursorNotAllowed}
          onDragOver={handleCanvasDragOver}
          ref={canvasRef}
          onDrop={handleCanvasDrop}
        >
          {form.map((item) => (
            <div
              className={`${item.id} custom-form-item ${draggingId === item.customFormId ? "custom-form-item-selected" : ""}`}
              draggable
              key={item.id}
              onDrop={(e) => handleDrop(item.customFormId, item.droppable, e)}
              onDragOver={(e) => handleDragOver(item.droppable, e)}
              onDragStart={() => hanldeDragStart(item.customFormId)}
              onMouseDown={() => setDraggingId(item.customFormId)}
            >
              {getFormItem(item.type)}
            </div>
          ))}
        </div>
      </div>
      <div className="right-sider">sider</div>
    </div>
  );
});
