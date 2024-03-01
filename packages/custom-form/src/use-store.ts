import * as R from "ramda";
import { ForwardedRef, useImperativeHandle, useState } from "react";

import { COMPONENTS, getRuleForm } from "./components/components";
import { CustomFormRef, FormItemConfigType } from "./types/index.types";
export const UseStore = (ref: ForwardedRef<CustomFormRef>) => {
  const [x, setX] = useState<number>(375);

  const [y, setY] = useState<number>(600);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormItemConfigType<any>[]>([]);

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

  const handleCanvasDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleCursorGrabbing();
  };

  const handleComponentDragStart = (id: string) => {
    setDraggingId(id);
    handleCursorGrabbing();
  };

  const handleCanvasDrop = () => {
    if (form.every((item) => item.id !== draggingId)) {
      const config = COMPONENTS.find((item) => item.id === draggingId);

      if (!config) {
        throw new Error(
          "Can't not find that component.Please check whether is exit.",
        );
      }

      const id = crypto.randomUUID().toString().replace(/-/g, "");

      setForm([
        ...form,
        {
          id,
          type: config.type,
          droppable: config.droppable,
          rule: { id, name: config.title },
        },
      ]);
    } else if (form.some((item) => item.id === draggingId)) {
      const formIndex = R.findIndex((value) => value.id === draggingId, form);

      setForm(R.move(formIndex, -1, form));
    }
  };

  const handleUpdateRule = (id: string, value: any) => {
    const result = form.map((item) =>
      item.id === id ? { ...item, rule: value } : item,
    );

    setForm(result);
  };

  const handleRenderRuleForm = () => {
    const item = form.find((item) => item.id === draggingId);

    const handleChange = (value: any) =>
      item && handleUpdateRule(item.id, value);

    return (
      item &&
      getRuleForm(item.type, `${draggingId}-rule`, item?.rule, handleChange)
    );
  };

  useImperativeHandle(ref, () => ({
    getFormConfigData: () => form,
  }));

  return {
    x,
    y,
    tabKey,
    form,
    draggingId,
    setForm,
    setDraggingId,
    setX,
    setY,
    setTabKey,
    handleCursorGrabbing,
    handleCursorNotAllowed,
    handleCanvasDragOver,
    handleCanvasDrop,
    handleComponentDragStart,
    handleRenderRuleForm,
  };
};
