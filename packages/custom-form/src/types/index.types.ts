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

export type RuleFormRef = {
  check: () => boolean;
};

export type FormComponentType = {
  type: string;
  group: string;
  id: string;
  icont?: ReactNode;
  droppable?: boolean;
  title: string;
  data: Omit<BaseRuleType, "id" | "label">;
  renderForm?: (props?: IRenderFormProps) => ReactNode;
  renderRuleForm?: (
    props: IRenderRuleFormProps,
    ref?: React.MutableRefObject<RuleFormRef | null>,
  ) => ReactNode;
};

export type FormItemConfigType = {
  id: string; // 关联数据流的唯一id
  type: string; // 组件类型
  rule: BaseRuleType;
  droppable?: boolean; // 该表单是否可以被放置
  dragable?: boolean;
  children?: FormItemConfigType[];
};

export type DataType = {
  id: string;
  formData: any;
  children: DataType[];
};

export type CategoryType = Array<{ type: string; name: string }>;

export interface ICustomFormProps {
  width: string;
  height: string;
  customsComponent?: FormComponentType[];
  customsCategory?: CategoryType;
}
export type CustomFormRef = {
  getFormConfigData: () => FormItemConfigType[];
};
