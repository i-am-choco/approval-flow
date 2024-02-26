import "./index.css";

import { InputNumber } from "antd";
import * as R from "ramda";
import React, { useMemo, useState } from "react";

import { COMPONENTS, getFormItem, getRuleForm } from "./components/components";
import { Tabs } from "./components/tabs/tabs";
import { FormItemConfigType } from "./types/index.types";

export const CustomForm = React.forwardRef(() => {
  const [x, setX] = useState<number>(375);

  const [y, setY] = useState<number>(600);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormItemConfigType[]>([]);

  const [tabKey, setTabKey] = useState<string>("control");

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
      // 新增组件 待优化
      const config = COMPONENTS.find(
        (item) => item.customFormId === draggingId,
      );

      if (!config) return;

      const formItem = {
        id: crypto.randomUUID(),
        customFormId: `custom-form-${form.length}`,
        type: config.type,
        droppable: config.droppable,
      };

      setForm([...form, formItem]);
      setDraggingId(formItem.customFormId);
    } else if (form.some((item) => item.customFormId === draggingId)) {
      // 当前组件移动到画布的最后
      const index = R.findIndex(
        (value) => value.customFormId === draggingId,
        form,
      );

      const result = R.move(index, -1, form).map((item, index) => ({
        ...item,
        customFormId: `custom-form-${index}`,
      }));

      setForm(result);
      setDraggingId(R.pathOr(null, [result.length - 1], result));
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

      const config = COMPONENTS.find((value) => value.customFormId === id);

      if (!config) return;

      const result = R.insert(
        currentIndex,
        {
          id: crypto.randomUUID(),
          customFormId: `custom-form-${form.length}`,
          type: config.type,
          droppable: config.droppable,
        },
        form,
      ).map((item, index) => ({
        ...item,
        customFormId: `custom-form-${index}`,
      }));

      setForm(result);
      setDraggingId(R.pathOr(null, [currentIndex], result));
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

      const result = R.move(index, currentIndex, form).map((item, index) => ({
        ...item,
        customFormId: `custom-form-${index}`,
      }));

      setForm(result);
      setDraggingId(R.pathOr(null, [currentIndex], result));
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

  const handleUpdateRule = (id: string, value: any) => {
    const result = form.map((item) =>
      item.id === id ? { ...item, rule: value } : item,
    );

    setForm(result);
  };

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
    [x, y],
  );

  // 右侧栏菜单
  const tabsOptions = [
    {
      value: "control",
      label: "控件属性",
      render: () => {
        const item = form.find((item) => item.customFormId === draggingId);

        const handleChange = (value: any) =>
          item && handleUpdateRule(item.id, value);

        return (
          item &&
          getRuleForm(item.type, `${draggingId}-rule`, item?.rule, handleChange)
        );
      },
    },
    { value: "form", label: "表单属性" },
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
