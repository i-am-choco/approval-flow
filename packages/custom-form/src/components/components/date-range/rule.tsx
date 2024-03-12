import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";
import { RuleDateFormat } from "../../rules/ruleDateFormat";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const DateRangeRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

  return (
    <div>
      <RuleTitle
        value={rule?.title || ["", ""]}
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
      <RuleDateFormat
        value={rule?.formatter || "mm/dd/yyyy"}
        checked={rule?.automaticCalculate || false}
        onChange={(formatter, automaticCalculate) =>
          onChange && onChange({ ...rule, formatter, automaticCalculate })
        }
      />
      <RuleRequired
        checked={rule?.required || false}
        onChange={(required) => onChange && onChange({ ...rule, required })}
      />
    </div>
  );
});
