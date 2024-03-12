import React from "react";

import { IRenderRuleFormProps } from "../../..";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTitle } from "../../rules/ruleTitle";

export const UploadRule = React.memo((props: IRenderRuleFormProps) => {
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
      <RuleRequired
        checked={rule?.required || false}
        onChange={(required) => onChange && onChange({ ...rule, required })}
      />
    </div>
  );
});
