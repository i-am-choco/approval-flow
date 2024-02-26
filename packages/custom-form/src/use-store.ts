import * as R from "ramda";
import { useState } from "react";

import { COMPONENTS, getRuleForm } from "./components/components";
import { FormItemConfigType } from "./types/index.types";

export const UseStore = () => {
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

  const handleCanvasDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleCursorGrabbing();
  };

  const handleComponentDragStart = (id: string) => {
    setDraggingId(id);
    handleCursorGrabbing();
  };

  const handleAdd = (currentIndex: number) => {
    const config = COMPONENTS.find((item) => item.customFormId === draggingId);

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
    setDraggingId(R.pathOr(null, [currentIndex, "customFormId"], result));
  };

  const handleMove = (toIndex: number) => {
    const formIndex = R.findIndex(
      (value) => value.customFormId === draggingId,
      form,
    );

    const result = R.move(formIndex, toIndex, form).map((item, index) => ({
      ...item,
      customFormId: `custom-form-${index}`,
    }));

    setForm(result);
    setDraggingId(R.pathOr(null, [toIndex, "customFormId"], result));
  };

  const handleCanvasDrop = () => {
    if (form.every((item) => item.customFormId !== draggingId)) {
      handleAdd(-1);
    } else if (form.some((item) => item.customFormId === draggingId)) {
      handleMove(-1);
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
      form,
    );

    if (form.every((item) => item.customFormId !== draggingId)) {
      handleAdd(currentIndex);
    } else if (form.some((item) => item.customFormId === draggingId)) {
      handleMove(currentIndex);
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

  const handleRenderRuleForm = () => {
    const item = form.find((item) => item.customFormId === draggingId);

    const handleChange = (value: any) =>
      item && handleUpdateRule(item.id, value);

    return (
      item &&
      getRuleForm(item.type, `${draggingId}-rule`, item?.rule, handleChange)
    );
  };

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
    handleDrop,
    hanldeDragStart,
    handleDragOver,
    handleRenderRuleForm,
  };
};
