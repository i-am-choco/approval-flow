import "./index.css";

import { InputNumber } from "antd";
import React, { useMemo } from "react";

import { COMPONENTS, getFormItem } from "./components/components";
import { RuleList } from "./components/rule-list";
import { Tabs } from "./components/tabs/tabs";
import { UseStore } from "./use-store";

export const CustomForm = React.forwardRef(() => {
  const {
    x,
    y,
    form,
    draggingId,
    tabKey,
    setX,
    setY,
    setTabKey,
    setForm,
    setDraggingId,
    handleCursorNotAllowed,
    handleRenderRuleForm,
    handleCanvasDragOver,
    handleCanvasDrop,
    handleComponentDragStart,
    handleDrop,
    hanldeDragStart,
    handleDragOver,
  } = UseStore();

  const canvasHeader = useMemo(
    () => (
      <>
        <span style={{ marginLeft: 8 }}>画布x宽度：</span>
        <InputNumber
          value={x}
          onChange={(value) => setX(value || 0)}
          max={800}
        />
        <span style={{ marginLeft: 8 }}>画布y宽度：</span>
        <InputNumber key="y" value={y} onChange={(value) => setY(value || 0)} />
      </>
    ),
    [setX, setY, x, y],
  );

  // 右侧栏菜单
  const tabsOptions = [
    {
      value: "control",
      label: "控件属性",
      render: handleRenderRuleForm,
    },
    {
      value: "form",
      label: "表单属性",
      render: () => <RuleList formConfig={form} onChange={setForm} />,
    },
  ];

  return (
    <div className="custom-form-layout">
      <div className="custom-form-left-sider">
        <div className="custom-form-component-layout">
          {COMPONENTS.map((item) => {
            return (
              <div
                className="custom-form-component"
                key={item.type}
                id={item.id}
                draggable
                style={{ cursor: "grab" }}
                onDragStart={() => handleComponentDragStart(item.customFormId)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
      <div className="custom-form-canvas-layout">
        <div className="custom-form-canvas-header">{canvasHeader}</div>
        <div
          id="custom-form-canvas"
          style={{ width: x, height: y }}
          onDragLeave={handleCursorNotAllowed}
          onDragOver={handleCanvasDragOver}
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
              {getFormItem(item.type, item.rule)}
            </div>
          ))}
        </div>
      </div>
      <div className="custom-form-right-sider">
        <Tabs value={tabKey} options={tabsOptions} onChange={setTabKey} />
      </div>
    </div>
  );
});
