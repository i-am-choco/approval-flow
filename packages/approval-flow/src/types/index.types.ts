import { ReactNode } from "react";
import { EdgeProps, Node, NodeProps } from "reactflow";

export interface IAddProps {
  name: string;
  parentId: string;
  type: string;
}

export type CardType = {
  title: string;
  displayDelete?: boolean;
  displayCopy?: boolean;
  className?: string;
  styles?: React.CSSProperties;
  onDelete?: (nodeId: string) => void;
  onCopy?: (nodeId: string) => void;
  render?: () => ReactNode;
  renderForm?: (
    parentId: string,
    currentId: string,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
};

export type BaseDataType = {
  id: string;
  parentId: string;
  status?: "error" | "warning" | "success";
  message?: string;
  setting?: any;
  type?: string;
  name?: string;
  description?: string;
  sortNumber?: number;
  draggable?: boolean;
  position?: { x: number; y: number };
  render?: <T extends BaseDataType>(props: NodeProps<T>) => ReactNode;
};

export type EdgeDataType = {
  source?: Node;
  target?: Node;
  status?: "error" | "warning" | "success";
  message?: string;
};

export type AddEdgeOptionsType = {
  type: "ApproverNode" | "CcRecipientNode" | "Condition";
  title?: string;
  color?: string;
  renderForm?: (
    parentId: string,
    currentId: string,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
};

export interface IApprovalAddEdgeProps {
  initiatorClassName?: string;
  approverClassName?: string;
  ccClassName?: string;
  conditionClassName?: string;
  onAdd?: (value: IAddProps) => void;
  renderInitiatorForm?: (
    parentId: string,
    currentId: string,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
  renderApproverForm?: (
    parentId: string,
    currentId: string,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
  renderCcRecipientForm?: (
    parentId: string,
    currentId: string,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
  renderConditionForm?: (
    parentId: string,
    currentId: string,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
}

export type ApprovalFlowRefType = {
  verify: () => { status: string; message: string[] };
};

export interface IAddEdgeProps extends IApprovalAddEdgeProps {
  edge: EdgeProps<EdgeDataType>;
  direction: "TB" | "LR";
  isCondition?: boolean;
  isEnd?: boolean;
}

export interface IApprovalFlowProps<T> {
  data: T[];
  // LR方向部分樣式邏輯未修復
  direction: "TB" | "LR";
  nodeWidth: number;
  nodeHeight: number;
  addEdgeProps: IApprovalAddEdgeProps;
  roots?: T[];
  onSort?: (value: Record<string, number>) => void;
  onDelete?: (nodeId: string) => void;
  onCopy?: (nodeId: string) => void;
}
