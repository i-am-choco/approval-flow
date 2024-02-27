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
              { label: "a", key: "a" },
              { label: "b", key: "b" },
              { label: "c", key: "b" },
            ],
            displayRule: "a",
          });
      }}
    >
      点击
    </Button>
  );
});
