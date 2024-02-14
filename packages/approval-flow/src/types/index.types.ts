import { ReactNode } from "react";
import { EdgeProps, Node, NodeProps } from "reactflow";

export interface IAddProps {
  name: string;
  parentId: string;
  type: string;
}

export type CardType = {
  title: string;
  className?: string;
  styles?: React.CSSProperties;
  titleStyles?: React.CSSProperties;
  render?: () => ReactNode;
};

export type BaseDataType = {
  id: string;
  parentId: string;
  type?: string;
  title?: string;
  description?: string;
  sortNumber?: number;
  render?: <T extends BaseDataType>(props: NodeProps<T>) => ReactNode;
};

export type EdgeDataType = {
  source?: Node;
  target?: Node;
};

export type AddEdgeOptionsType = {
  type:
    | "InitiatorNode"
    | "ApproverNode"
    | "CcRecipientNode"
    | "Condition"
    | string;
  title?: string;
  color?: string;
  renderForm?: (
    type: string,
    edge: EdgeProps<EdgeDataType>,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
  renderConditionForm?: (
    edge: EdgeProps<EdgeDataType>,
    open: boolean,
    onClose?: () => void,
  ) => ReactNode;
};

export interface IAddEdgeProps {
  edge: EdgeProps;
  direction: "TB" | "LR";
  cards: Array<AddEdgeOptionsType>;
  isCondition?: boolean;
  onAdd?: (value: IAddProps) => void;
}

export interface IApprovalFlowProps<T> {
  data: T[];
  direction: "TB" | "LR";
  nodeWidth: number;
  nodeHeight: number;
  addEdgeCards: Array<AddEdgeOptionsType>;
  roots?: T[];
  onAdd?: (value: IAddProps) => void;
  onSort?: (value: Record<string, number>) => void;
}

export { NodeProps };
