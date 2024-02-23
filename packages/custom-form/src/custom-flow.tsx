import "./index.css";

import { Button, InputNumber } from "antd";
import * as R from "ramda";
import React, { useRef, useState } from "react";

import { FormItemType } from "./types/index.types";
export const CustomForm = React.memo(() => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const [x, setX] = useState<number>(375);

  const [y, setY] = useState<number>(600);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [component, setComponent] = useState<FormItemType[]>([]);

  /** --------------------------  画布事件处理  -------------------------- */

  const handleCanvasDragLeave = () => {
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "not-allowed";
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "grabbing";
    }
  };

  const handleCanvasDrop = () => {
    console.log("canvas drop");
    if (component.every((item) => item.id !== draggingId)) {
      // 新增组件
      setComponent([
        ...component,
        {
          id: `custom-form-${component.length}`,
          render: () => <Button>按钮</Button>,
          droppable: true,
        },
      ]);
      setDraggingId(`custom-form-${component.length}`);
    } else if (component.some((item) => item.id === draggingId)) {
      // 当前组件移动到画布的最后
      const index = R.findIndex((value) => value.id === draggingId, component);

      const result = R.move(index, -1, component);

      setComponent(
        result.map((item, index) => ({
          ...item,
          id: `custom-form-${index}`,
        })),
      );
      setDraggingId(`custom-form-${component.length - 1}`);
    }
  };

  /** --------------------------  组件库组件事件处理  -------------------------- */
  const handleComponentDragStart = (id: string) => {
    setDraggingId(id);
    const element = document.getElementById(id);

    if (element) {
      element.style.cursor = "not-allowed";
    }
  };

  /** --------------------------  画布组件事件处理  -------------------------- */

  const handleDrop = (
    id: string,
    droppable: boolean,
    e: React.DragEvent<HTMLElement>,
  ) => {
    e.stopPropagation();
    if (!droppable || !draggingId) return;
    if (component.every((item) => item.id !== draggingId)) {
      // 新增组件
    } else if (component.some((item) => item.id === draggingId)) {
      // 移动组件模块，组件内部组件不接收处理
      const currentIndex = R.findIndex((value) => value.id === id, component);

      const index = R.findIndex((value) => value.id === draggingId, component);

      const result = R.move(index, currentIndex, component);

      setComponent(
        result.map((item, index) => ({
          ...item,
          id: `custom-form-${index}`,
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
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = droppable ? "grabbing" : "not-allowed";
    }
  };

  const hanldeDragStart = (id: string) => {
    setDraggingId(id);
    const element = draggingId && document.getElementById(draggingId);

    if (element) {
      element.style.cursor = "grabbing";
    }
  };

  return (
    <div className="custom-form-layout">
      <div className="left-sider">
        {/* todo: 后续此处为组件列表render */}
        <Button
          id="custom-form-button"
          draggable
          style={{ cursor: "grab" }}
          onDragStart={() => handleComponentDragStart("custom-form-button")}
        >
          按钮
        </Button>
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
          onDragLeave={handleCanvasDragLeave}
          onDragOver={handleCanvasDragOver}
          ref={canvasRef}
          onDrop={handleCanvasDrop}
        >
          {component.map((item, index) => (
            <div
              className={`custom-form-item ${draggingId === item.id ? "custom-form-item-selected" : ""}`}
              draggable
              key={index}
              onDrop={(e) => handleDrop(item.id, item.droppable, e)}
              onDragOver={(e) => handleDragOver(item.droppable, e)}
              onDragStart={() => hanldeDragStart(item.id)}
              onMouseDown={() => setDraggingId(item.id)}
            >
              {item.render()}
            </div>
          ))}
        </div>
      </div>
      <div className="right-sider">sider</div>
    </div>
  );
});
