import { Input } from "antd";
import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";
import { RuleTitle } from "../../rules/ruleTitle";
export const ListRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

  return (
    <div>
      <RuleTitle
        value={rule?.title || [""]}
        onChange={(title) =>
          onChange &&
          onChange({ ...rule, title, label: title?.join("-") || rule?.label })
        }
      />
      <p>動作名稱</p>
      <Input
        value={rule?.action}
        onChange={(e) =>
          onChange && onChange({ ...rule, action: e.target.value })
        }
        count={{ show: true, max: 50 }}
      />
    </div>
  );
});
