import * as R from "ramda";
import {
  ForwardedRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { CATEGORY, COMPONENTS, getRuleForm } from "./components/components";
import {
  CustomFormRef,
  FormItemConfigType,
  ICustomFormProps,
  RuleFormRef,
} from "./types/index.types";
export const UseStore = (
  props: ICustomFormProps,
  ref: ForwardedRef<CustomFormRef>,
) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormItemConfigType[]>([]);

  const [tabKey, setTabKey] = useState<string>("control");

  const ruleFormRef = useRef<RuleFormRef | null>(null);

  const [notAllowed, setNotAllowed] = useState<boolean>(false);

  const { customsCategory, customsComponent } = props;

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

  const getFormConfigData = useCallback(
    (list: FormItemConfigType[]): FormItemConfigType | undefined => {
      let result = undefined;

      list.some((item) => {
        const value =
          list.find((item) => item.id === draggingId) ||
          (item.children && getFormConfigData(item.children));

        result = value;

        return !!value;
      });

      return result;
    },
    [draggingId],
  );

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
    if (notAllowed) return;
    setDraggingId(id);
  };

  useEffect(() => {
    if (draggingId && form) {
      const formConfigData = getFormConfigData(form);

      setNotAllowed(
        (formConfigData &&
          ruleFormRef.current &&
          ruleFormRef.current.check()) ||
          false,
      );
    } else {
      setNotAllowed(false);
    }
  }, [draggingId, form, getFormConfigData]);

  useImperativeHandle(ref, () => ({
    getFormConfigData: () => form,
  }));

  const category = useMemo(() => {
    const componentList = [...COMPONENTS, ...(customsComponent || [])];

    const group = R.groupBy(R.prop("group"), componentList);

    const categories = [...CATEGORY, ...(customsCategory || [])];

    return categories.map((item) => ({
      ...item,
      component: R.pathOr([], [item.type], group),
    }));
  }, [customsCategory, customsComponent]);

  return {
    tabKey,
    form,
    draggingId,
    ruleFormRef,
    category,
    notAllowed,
    setForm,
    handleUpdateDraggingId,
    setTabKey,
    handleCursorGrabbing,
    handleCursorNotAllowed,
    handleCanvasDragOver,
    handleCanvasDrop,
    handleComponentDragStart,
    handleRenderRuleForm,
  };
};
