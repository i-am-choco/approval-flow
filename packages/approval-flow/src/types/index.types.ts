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
  titleStyles?: React.CSSProperties;
  onDelete?: (nodeId: string) => void;
  onCopy?: (nodeId: string) => void;
  render?: () => ReactNode;
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
    edge: EdgeProps<EdgeDataType>,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
};

export interface IApprovalAddEdgeProps {
  onAdd?: (value: IAddProps) => void;
  renderApproverForm?: (
    edge: EdgeProps<EdgeDataType>,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
  renderCcRecipientForm?: (
    edge: EdgeProps<EdgeDataType>,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
  renderConditionForm?: (
    edge: EdgeProps<EdgeDataType>,
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
}

export interface IApprovalFlowProps<T> {
  data: T[];
  direction: "TB" | "LR";
  nodeWidth: number;
  nodeHeight: number;
  addEdgeProps: IApprovalAddEdgeProps;
  roots?: T[];
  onSort?: (value: Record<string, number>) => void;
  onDelete?: (nodeId: string) => void;
  onCopy?: (nodeId: string) => void;
}
