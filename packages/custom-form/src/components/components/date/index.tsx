import { DatePicker } from "antd";
import React from "react";

import { IRenderFormProps } from "../../..";
export const Date = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div>
      <p>{rule?.title?.[0] || ""}</p>
      <DatePicker
        disabled
        placeholder="請選擇"
        style={{ width: "100%", pointerEvents: "none" }}
      />
    </div>
  );
});
