export type FormItemType = {
  //   type: "Input" | "InputNumber" | "Button" | string;
  //   data: T;
  //   allowDelete: boolean;
  id: string;
  render: () => React.ReactNode;
  droppable: boolean;
};
