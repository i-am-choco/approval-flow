import { ReactNode } from "react";

export type BaseRuleType = {
  id: string;
  name: string;
  displayRule?: string;
  displayRuleId?: string;
  displayRuleDisabled?: boolean;
  options?: Array<{ label: string; value: string }>;
};
export interface IRenderRuleFormProps {
  ruleId: string;
  rule?: any;
  onChange?: (value: any) => void;
}

export type FormComponentType = {
  type: string;
  id?: string;
  customFormId: string;
  droppable: boolean;
  title: string;
  renderForm?: (rule?: any) => ReactNode;
  renderRuleForm?: (props: IRenderRuleFormProps) => ReactNode;
};

export type FormItemConfigType<Rule extends BaseRuleType> = {
  id: string; // 关联数据流的唯一id
  type: string; // 组件类型
  rule: Rule;
  customFormId: string; // 控制面板拖放事件id
  droppable: boolean; // 该表单是否可以被放置
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
