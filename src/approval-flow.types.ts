export type DataType = {
  // 当前节点id
  id: string;
  // 父节点id
  parentId: string;
  // 节点名
  name: string;
  // 结点文本内容
  description: string;
  // 节点图标
  icon: string;
  // 节点类型
  type: string;
  // 不知道是什么
  handler: unknown;
  // 不知道是啥
  expressionInit: null;
  // 不知道是啥
  setting: null;
  // 不知道是啥
  sort_number: number;
};
