import React from "react";

import { FormComponentType, IRenderFormProps } from "../../types/index.types";
import { Input } from "./Input/input";
import { InputRule } from "./Input/input-rule";
import { List } from "./List";
import { Select } from "./Select";
import { SelectRule } from "./Select/rule";

export const COMPONENTS: FormComponentType[] = [
  {
    type: "Input",
    id: "custom-form-input",
    title: "输入框",
    renderForm: () => <Input />,
    renderRuleForm: (props) => <InputRule {...props} />,
  },
  {
    type: "InputArea",
    id: "custom-form-input-area",
    title: "多行输入框",
  },
  {
    type: "dateRange",
    id: "custom-form-date-range",
    title: "日期选择器",
  },
  {
    type: "Select",
    id: "custom-form-select",
    title: "单选框",
    renderForm: () => <Select />,
    renderRuleForm: (props) => <SelectRule {...props} />,
  },
  {
    type: "List",
    id: "custom-form-list",
    droppable: true,
    title: "列表",
    renderForm: () => <List />,
  },
];

export const getForm = (type: string) => {
  const result = COMPONENTS.find((item) => item.type === type);

  return (result?.renderForm && result?.renderForm()) ?? <p>需要维护</p>;
};

export const getFormItem = (type: string, params: IRenderFormProps<any>) => {
  const result = COMPONENTS.find((item) => item.type === type);

  return (result?.renderForm && result?.renderForm(params)) ?? <p>需要维护</p>;
};

export const getRuleForm = (
  type: string,
  ruleId: string,
  rule: any,
  onChange: (value: any) => void,
) => {
  const result = COMPONENTS.find((item) => item.type === type);

  return (
    (result?.renderRuleForm &&
      result?.renderRuleForm({ ruleId, rule, onChange })) ?? <p>需要维护</p>
  );
};
