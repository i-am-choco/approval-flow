import React from "react";

import { FormComponentType } from "../../types/index.types";
import { Input } from "./Input/input";
import { InputRule } from "./Input/input-rule";
import { Select } from "./Select";
import { SelectRule } from "./Select/rule";

export const COMPONENTS: FormComponentType[] = [
  {
    type: "Input",
    customFormId: "custom-form-input",
    droppable: true,
    title: "输入框",
    renderForm: () => <Input />,
    renderRuleForm: (props) => <InputRule {...props} />,
  },
  {
    type: "InputArea",
    customFormId: "custom-form-input-area",
    droppable: true,
    title: "多行输入框",
  },
  {
    type: "dateRange",
    customFormId: "custom-form-date-range",
    droppable: true,
    title: "日期选择器",
  },
  {
    type: "Select",
    customFormId: "custom-form-select",
    droppable: true,
    title: "单选框",
    renderForm: () => <Select />,
    renderRuleForm: (props) => <SelectRule {...props} />,
  },
];

export const getFormItem = (type: string, rule: any) => {
  const result = COMPONENTS.find((item) => item.type === type);

  return (result?.renderForm && result?.renderForm(rule)) ?? <p>需要维护</p>;
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
