import React from "react";

import { Input } from "./Input/input";

export const compoents = [
  {
    type: "Input",
    id: "custom-form-input",
    droppable: true,
    title: "输入框",
  },
];

export const getFormItem = (type: string) => {
  switch (type) {
    case "Input":
      return <Input />;

    default:
      return <p>需要维护</p>;
  }
};
