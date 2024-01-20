import { ReactNode } from "react";
import { NodeProps } from "reactflow";

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
  roots?: T[];
  direction: "TB" | "LR";
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
