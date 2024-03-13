import { Input } from "antd";
import React from "react";

import { IRenderFormProps } from "../../../types/index.types";

export const Description = React.memo((props: IRenderFormProps) => (
  <div>
    <Input.TextArea value={props.rule?.description} />
  </div>
));
