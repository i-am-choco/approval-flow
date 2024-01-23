import { DrawerProps } from "antd";
import { ReactNode } from "react";
import { EdgeProps, NodeProps } from "reactflow";

export interface IFunctionProps {
  onAdd?: () => void;
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
}

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
  renderForm: (open: boolean, onClose?: () => void) => ReactNode;
  onAdd: () => void;
  validateFields?: boolean;
};

export interface IAddEdgeProps {
  edge: EdgeProps;
  cards: Array<AddEdgeOptionsType>;
  drawerProps?: Omit<DrawerProps, "open">;
}
