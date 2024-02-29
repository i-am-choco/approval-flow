import { Button } from "antd";
import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";

export const SelectRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

  return (
    <Button
      onClick={() => {
        onChange &&
          onChange({
            ...rule,
            options: [
              { label: "a", value: "a" },
              { label: "b", value: "b" },
              { label: "c", value: "c" },
            ],
          });
      }}
    >
      点击
    </Button>
  );
});
