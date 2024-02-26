import { Input } from "antd";
import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";

export const InputRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, ruleId, onChange } = props;

  return (
    <Input
      key={ruleId}
      value={rule}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
});
