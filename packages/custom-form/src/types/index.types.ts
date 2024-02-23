// export type FormItemType = {
//   //   type: "Input" | "InputNumber" | "Button" | string;
//   //   data: T;
//   //   allowDelete: boolean;
//   id: string;
//   render: () => React.ReactNode;
//   droppable: boolean;
// };

export type FormItemConfigType = {
  id: string; // 关联数据流的唯一id
  type: string; // 组件类型
  customFormId: string; // 控制面板拖放事件id
  droppable: boolean; // 该表单是否可以被放置
  dragable?: boolean;
  rule?: any;
  children?: FormItemConfigType[];
};

export type DataType = {
  id: string;
  formData: any;
  formParams: any;
  children: DataType[];
};
