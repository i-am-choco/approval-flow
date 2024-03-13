import React from "react";

import { IRenderRuleFormProps } from "../../..";
import { RuleOptions } from "../../rules/ruleOptions";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const MultipleSelectRule = React.memo((props: IRenderRuleFormProps) => {
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
      <RuleOptions
        mode={rule?.mode || "custom"}
        value={rule?.formatter || "custom"}
        display={rule?.display || "drop"}
        options={rule?.options || []}
        moduleOptions={rule?.moduleOptions || []}
        onChange={(options) => onChange && onChange({ ...rule, options })}
        onDisplayChange={(display) =>
          onChange && onChange({ ...rule, display })
        }
      />
      <RuleRequired
        checked={rule?.required || false}
        onChange={(required) => onChange && onChange({ ...rule, required })}
      />
    </div>
  );
});
