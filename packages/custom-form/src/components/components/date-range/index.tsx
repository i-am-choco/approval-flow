import { DatePicker } from "antd";
import React from "react";

import { IRenderFormProps } from "../../../types/index.types";

export const DateRange = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div className="custom-form-component-data-range">
      <p>{rule?.title?.[0] || ""}</p>
      <DatePicker
        disabled
        placeholder="請選擇"
        style={{ width: "100%", marginBottom: 8, pointerEvents: "none" }}
      />
      <p>{rule?.title?.[1] || ""}</p>
      <DatePicker
        disabled
        placeholder="請選擇"
        style={{ width: "100%", pointerEvents: "none" }}
      />
    </div>
  );
});
