import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const InputRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

  return (
    <div>
      <RuleTitle
        value={rule?.title || [""]}
        onChange={(value) =>
          onChange &&
          onChange({
            ...rule,
            title: value,
            label: value.join("-") || rule?.label,
          })
        }
      />
      <RuleTips
        value={rule?.tips}
        onChange={(tips) => onChange && onChange({ ...rule, tips })}
      />
      <RuleRequired
        checked={rule?.required || false}
        onChange={(required) => onChange && onChange({ ...rule, required })}
      />
    </div>
  );
});
