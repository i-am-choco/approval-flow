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
  render?: () => ReactNode;
};

export type BaseDataType = {
  id: string;
  parentId: string;
  type?: string;
  name?: string;
  description?: string;
  sortNumber?: number;
  draggable?: boolean;
  render?: <T extends BaseDataType>(props: NodeProps<T>) => ReactNode;
};

export type EdgeDataType = {
  source?: Node;
  target?: Node;
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

export interface IAddEdgeProps extends IApprovalAddEdgeProps {
  edge: EdgeProps;
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
}

export { NodeProps };
