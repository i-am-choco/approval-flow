import * as R from "ramda";
import { ForwardedRef, useImperativeHandle, useRef, useState } from "react";

import { COMPONENTS, getRuleForm } from "./components/components";
import {
  CustomFormRef,
  FormItemConfigType,
  RuleFormRef,
} from "./types/index.types";
export const UseStore = (ref: ForwardedRef<CustomFormRef>) => {
  const [x, setX] = useState<number>(375);

  const [y, setY] = useState<number>(600);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormItemConfigType[]>([]);

  const [tabKey, setTabKey] = useState<string>("control");

  const ruleFormRef = useRef<RuleFormRef | null>(null);

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
    handleUpdateDraggingId(id);
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
          rule: {
            id,
            label: config.data?.title?.join("-") || config.title,
            ...config.data,
          },
        },
      ]);
      handleUpdateDraggingId(id);
    } else if (form.some((item) => item.id === draggingId)) {
      const formIndex = R.findIndex((value) => value.id === draggingId, form);

      setForm(R.move(formIndex, -1, form));
    }
  };

  const handleUpdateRule = (id: string, rule: any) => {
    let flag = false;

    const update = (list: FormItemConfigType[]): FormItemConfigType[] =>
      list.map((item) => {
        if (flag) return item;
        if (item.id === id) {
          flag = true;

          return { ...item, rule };
        } else {
          return { ...item, children: item.children && update(item.children) };
        }
      });

    setForm(update(form));
  };

  const getFormConfigData = (
    list: FormItemConfigType[],
  ): FormItemConfigType | undefined => {
    let result = undefined;

    list.some((item) => {
      const value =
        list.find((item) => item.id === draggingId) ||
        (item.children && getFormConfigData(item.children));

      result = value;

      return !!value;
    });

    return result;
  };

  const handleRenderRuleForm = () => {
    const item = draggingId && getFormConfigData(form);

    const handleChange = (value: any) =>
      item && handleUpdateRule(item.id, value);

    return (
      item &&
      getRuleForm(
        item.type,
        `${draggingId}-rule`,
        item?.rule,
        handleChange,
        ruleFormRef,
      )
    );
  };

  const handleUpdateDraggingId = (id: string | null) => {
    if (ruleFormRef.current?.check()) return;
    setDraggingId(id);
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
    ruleFormRef,
    setForm,
    handleUpdateDraggingId,
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
