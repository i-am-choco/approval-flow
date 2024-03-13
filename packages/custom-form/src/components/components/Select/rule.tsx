import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";
import { RuleOptions } from "../../rules/ruleOptions";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const SelectRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

  return (
    <div>
      <RuleTitle value={["單選框"]} onChange={() => {}} />
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
    </div>
  );
});
