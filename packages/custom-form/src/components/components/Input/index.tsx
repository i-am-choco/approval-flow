import { Input as AntdInput } from "antd";
import React from "react";

import { IRenderFormProps } from "../../..";

export const Input = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div>
      <p>{rule?.title?.[0] || ""}</p>
      <AntdInput />
    </div>
  );
});
