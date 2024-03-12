import { ReactNode } from "react";

export type BaseRuleType = {
  id: string;
  label: string;
  title?: string[];
  tips?: string;
  required?: boolean;
  decimals?: boolean;
  precision?: number;
  formatter?: string;
  mode?: "custom" | "module";
  display?: "drop" | "tile";
  automaticCalculate?: boolean;
  description?: string;
  onlyApplication?: boolean;
  action?: string;
  displayRule?: string;
  displayRuleId?: string;
  displayRuleDisabled?: boolean;
  options?: string[];
  moduleOptions?: string[];
};
export interface IRenderRuleFormProps {
  ruleId: string;
  rule?: BaseRuleType;
  onChange?: (value: any) => void;
}
export interface IRenderFormProps {
  rule?: BaseRuleType;
}

export type FormComponentType = {
  type: string;
  id: string;
  droppable?: boolean;
  title: string;
  data: Omit<BaseRuleType, "id" | "label">;
  renderForm?: (props?: IRenderFormProps) => ReactNode;
  renderRuleForm?: (props: IRenderRuleFormProps) => ReactNode;
};

export type FormItemConfigType<Rule extends BaseRuleType> = {
  id: string; // 关联数据流的唯一id
  type: string; // 组件类型
  rule: Rule;
  droppable?: boolean; // 该表单是否可以被放置
  dragable?: boolean;
  children?: FormItemConfigType<Rule>[];
};

export type DataType = {
  id: string;
  formData: any;
  children: DataType[];
};

export interface ICustomFormProps {
  width: string;
  height: string;
}
export type CustomFormRef = {
  getFormConfigData: () => FormItemConfigType<any>[];
};
