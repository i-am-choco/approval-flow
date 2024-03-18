import { Input } from "antd";
import React from "react";

import { IRenderFormProps } from "../../..";

export const TextArea = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div>
      <p>{rule?.title?.[0] || ""}</p>
      <Input.TextArea
        disabled
        placeholder="請輸入"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
});
