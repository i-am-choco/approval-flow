import { DatePicker } from "antd";
import React from "react";

import { IRenderFormProps } from "../../../types/index.types";

export const DateRange = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div>
      <p>{rule?.title?.[0] || ""}</p>
      <DatePicker />
      <p>{rule?.title?.[1] || ""}</p>
      <DatePicker />
    </div>
  );
});
