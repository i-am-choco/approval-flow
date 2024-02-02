export {};

export type NodesResponseType = {
  id: string;
  parent_id: string;
  name: string;
  description: string;
  icon: null;
  type: string;
  handler: null;
  expression_init: null;
  setting: null;
  sort_number: number;
};

export type DetailResponseType = {
  id: string;
  code: string;
  name: string;
  description: string;
  platform: string;
  version: 1;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  nodes: NodesResponseType[];
  rules: null;
};

export type NodesType = {
  id: string;
  parentId: string;
  name: string;
  description: string;
  icon: null;
  type: string;
  handler: null;
  expressionInit: null;
  setting: null;
  sortNumber: number;
};

export type DetailType = {
  id: string;
  code: string;
  name: string;
  description: string;
  platform: string;
  version: 1;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  nodes: NodesType[];
  rules: null;
};
