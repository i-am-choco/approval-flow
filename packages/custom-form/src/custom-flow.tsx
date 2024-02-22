import "./index.css";

import { Button, InputNumber } from "antd";
import React, { useState } from "react";
export const CustomForm = React.memo(() => {
  const [x, setX] = useState<number>(375);

  const [y, setY] = useState<number>(600);

  const [draggingId, setDraggingId] = useState<string>("");

  const [component, setComponent] = useState<
    Array<{ id: string; render: () => React.ReactNode }>
  >([]);

  const handleCanvasDragEnter = () => {
    const draggingElement = document.getElementById(draggingId);

    if (draggingId && draggingElement) {
      draggingElement.style.cursor = "grabbing";
    }
  };

  const handleCanvasDragLeave = () => {
    const draggingElement = document.getElementById(draggingId);

    if (draggingId && draggingElement) {
      draggingElement.style.cursor = "not-allowed";
    }
  };

  const handleComponentDragStart = (id: string) => {
    setDraggingId(id);
    const draggableElement = document.getElementById(id);

    if (draggableElement) {
      draggableElement.style.cursor = "not-allowed";
    }
  };

  const handleComponentDragEnd = (item: {
    id: string;
    render: () => React.ReactNode;
  }) => {
    const draggingElement = document.getElementById(draggingId);

    if (draggingId && draggingElement) {
      draggingElement.style.cursor = "grab";
      setComponent([...component, item]);
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
          onDragEnd={() =>
            handleComponentDragEnd({
              id: "custom-form-button",
              render: () => <Button>按钮</Button>,
            })
          }
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
          <InputNumber value={y} onChange={(value) => setY(value || 0)} />
        </div>
        <div
          id="custom-form-canvas"
          className="canvas"
          style={{ width: x, height: y }}
          onDragEnter={handleCanvasDragEnter}
          onDragLeave={handleCanvasDragLeave}
        >
          {component.map((item) => item.render())}
        </div>
      </div>
      <div className="right-sider">sider</div>
    </div>
  );
});
