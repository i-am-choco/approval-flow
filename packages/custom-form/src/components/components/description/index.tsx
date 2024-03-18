import { Input } from "antd";
import React from "react";

import { IRenderFormProps } from "../../../types/index.types";

export const Description = React.memo((props: IRenderFormProps) => (
  <div>
    <Input.TextArea
      disabled
      value={props.rule?.description}
      style={{ pointerEvents: "none" }}
    />
  </div>
));
