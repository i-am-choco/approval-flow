import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";
export const TextAreaRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

  return (
    <div>
      <RuleTitle
        value={rule?.title || [""]}
        onChange={(title) =>
          onChange &&
          onChange({
            ...rule,
            title,
            label: title.join("-") || rule?.label,
          })
        }
      />
      <RuleTips
        value={rule?.tips}
        onChange={(tips) =>
          onChange &&
          onChange({
            ...rule,
            tips,
          })
        }
      />
      <RuleRequired
        checked={rule?.required || false}
        onChange={(required) =>
          onChange &&
          onChange({
            ...rule,
            required,
          })
        }
      />
    </div>
  );
});
