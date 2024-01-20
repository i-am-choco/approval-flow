export interface IApprovalFlowProps<T> {
  data: T[];
  roots?: T[];
  direction: "TB" | "LR";
}

export type BaseDataType = {
  id: string;
  parentId: string;
};
