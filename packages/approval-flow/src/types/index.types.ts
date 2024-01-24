import { ReactNode } from "react";
import { EdgeProps, NodeProps } from "reactflow";

export interface IAddProps {
  name: string;
  parentId: string;
  type: string;
}

export interface ICardProps {
  title: string;
  className?: string;
  styles?: React.CSSProperties;
  render?: () => ReactNode;
}

export type CardType = {
  className?: string;
  styles?: React.CSSProperties;
  render?: () => ReactNode;
};

export type BaseDataType = {
  id: string;
  parentId: string;
  type?: string;
  title?: string;
  description?: string;
  render?: <T extends BaseDataType>(props: NodeProps<T>) => ReactNode;
};

export type AddEdgeOptionsType = {
  title?: string;
  color?: string;
  renderForm: (
    open: boolean,
    onClose?: () => void,
    onAdd?: (value: IAddProps) => void,
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
  roots?: T[];
  sponsorProps?: CardType;
  approverProps?: CardType;
  carbonCopyProps?: CardType;
  conditionProps?: CardType;
  onAdd?: (value: IAddProps) => void;
}
