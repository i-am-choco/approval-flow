import { ReactNode } from "react";
import { NodeProps } from "reactflow";

export type SponsorType = {
  className?: string;
  styles?: React.CSSProperties;
  render?: () => ReactNode;
};

export interface IApprovalFlowProps<T> {
  data: T[];
  roots?: T[];
  direction: "TB" | "LR";
  sponsorProps?: SponsorType;
}

export type BaseDataType = {
  id: string;
  parentId: string;
  type?: string;
  title?: string;
  description?: string;
  render?: <T extends BaseDataType>(props: NodeProps<T>) => ReactNode;
};
