import React from "react";

import {
  CategoryType,
  FormComponentType,
  IRenderFormProps,
  RuleFormRef,
} from "../../types/index.types";
import { Date } from "./date";
import { DateRule } from "./date/rule";
import { DateRange } from "./date-range";
import { DateRangeRule } from "./date-range/rule";
import { Description } from "./description";
import { DescriptionRule } from "./description/rule";
import { Input } from "./input";
import { InputRule } from "./input/rule";
import { InputNumber } from "./inputNumber";
import { InputNumberRule } from "./inputNumber/rule";
import { List } from "./list";
import { ListRule } from "./list/rule";
import { MultipleSelect } from "./multipleSelect";
import { MultipleSelectRule } from "./multipleSelect/rule";
import { Select } from "./select";
import { SelectRule } from "./select/rule";
import { TextArea } from "./textArea";
import { TextAreaRule } from "./textArea/rule";
import { Upload } from "./upload";
import { UploadRule } from "./upload/rule";

export const DEFAULT_RULE = {
  input: {
    title: ["單行輸入框"],
    tips: undefined,
    required: false,
  },
  textArea: {
    title: ["多行輸入框"],
    tips: undefined,
    required: false,
  },
  inputNumber: {
    title: ["數字輸入框"],
    tips: undefined,
    decimals: false,
    precision: 0,
    formatter: "number",
    required: false,
  },
  select: {
    title: ["單選框"],
    tips: undefined,
    options: ["選項1", "選項2", "選項3"],
    mode: "custom",
    display: "drop",
    formatter: "custom",
    required: false,
  },
  multipleSelect: {
    title: ["多選框"],
    tips: undefined,
    options: ["選項1", "選項2", "選項3"],
    mode: "custom",
    display: "drop",
    formatter: "custom",
    required: false,
  },
  date: {
    title: ["日期時間"],
    tips: undefined,
    formatter: "mm/dd/yyyy",
    required: false,
  },
  dateRange: {
    title: ["開始日期時間", "結束日期時間"],
    tips: undefined,
    formatter: "mm/dd/yyyy",
    automaticCalculate: false,
    required: false,
  },
  description: {
    title: ["說明文字"],
    description: undefined,
    onlyApplication: false,
  },
  upload: {
    title: ["附件"],
    required: false,
  },
  list: {
    title: ["列表"],
    action: "添加",
  },
};

export const COMPONENTS: FormComponentType[] = [
  {
    type: "input",
    group: "base",
    id: "custom-form-input",
    title: "单行输入框",
    data: DEFAULT_RULE.input,
    renderForm: (props) => <Input {...props} />,
    renderRuleForm: (props, ref) => <InputRule {...props} ref={ref} />,
  },
  {
    type: "textArea",
    group: "base",
    id: "custom-form-input-area",
    title: "多行输入框",
    data: DEFAULT_RULE.textArea,
    renderForm: (props) => <TextArea {...props} />,
    renderRuleForm: (props, ref) => <TextAreaRule {...props} ref={ref} />,
  },
  {
    type: "inputNumber",
    group: "base",
    id: "custom-form-input-number",
    title: "数字输入框",
    data: DEFAULT_RULE.inputNumber,
    renderForm: (props) => <InputNumber {...props} />,
    renderRuleForm: (props) => <InputNumberRule {...props} />,
  },
  {
    type: "select",
    group: "base",
    id: "custom-form-select",
    title: "单选框",
    data: DEFAULT_RULE.select,
    renderForm: (props) => <Select {...props} />,
    renderRuleForm: (props, ref) => <SelectRule {...props} ref={ref} />,
  },
  {
    type: "multipleSelect",
    group: "base",
    id: "custom-form-multiple-select",
    title: "多选框",
    data: DEFAULT_RULE.multipleSelect,
    renderForm: (props) => <MultipleSelect {...props} />,
    renderRuleForm: (props, ref) => <MultipleSelectRule {...props} ref={ref} />,
  },
  {
    type: "date",
    group: "base",
    id: "custom-form-date",
    title: "日期时间",
    data: DEFAULT_RULE.date,
    renderForm: (props) => <Date {...props} />,
    renderRuleForm: (props, ref) => <DateRule {...props} ref={ref} />,
  },
  {
    type: "dateRange",
    group: "base",
    id: "custom-form-date-range",
    title: "日期时间区间",
    data: DEFAULT_RULE.dateRange,
    renderForm: (props) => <DateRange {...props} />,
    renderRuleForm: (props, ref) => <DateRangeRule {...props} ref={ref} />,
  },
  {
    type: "description",
    group: "base",
    id: "custom-form-description",
    title: "说明文字",
    data: DEFAULT_RULE.description,
    renderForm: (props) => <Description {...props} />,
    renderRuleForm: (props, ref) => <DescriptionRule {...props} ref={ref} />,
  },
  {
    type: "upload",
    group: "base",
    id: "custom-form-upload",
    title: "附件",
    data: DEFAULT_RULE.upload,
    renderForm: (props) => <Upload {...props} />,
    renderRuleForm: (props, ref) => <UploadRule {...props} ref={ref} />,
  },
  {
    type: "list",
    group: "base",
    id: "custom-form-list",
    droppable: true,
    title: "列表",
    data: DEFAULT_RULE.list,
    renderForm: (props) => <List {...props} />,
    renderRuleForm: (props, ref) => <ListRule {...props} ref={ref} />,
  },
];

export const CATEGORY: CategoryType = [
  {
    type: "base",
    name: "基礎控件",
  },
];

export const getForm = (type: string, params: IRenderFormProps) => {
  const result = COMPONENTS.find((item) => item.type === type);

  return (result?.renderForm && result?.renderForm(params)) ?? <p>需要维护</p>;
};

export const getRuleForm = (
  type: string,
  ruleId: string,
  rule: any,
  onChange: (value: any) => void,
  ref?: React.MutableRefObject<RuleFormRef | null>,
) => {
  const result = COMPONENTS.find((item) => item.type === type);

  return (
    (result?.renderRuleForm &&
      result?.renderRuleForm({ ruleId, rule, onChange }, ref)) ?? (
      <p>需要维护</p>
    )
  );
};
