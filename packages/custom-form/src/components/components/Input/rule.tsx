import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../../types/index.types";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const InputRule = React.forwardRef(
  (props: IRenderRuleFormProps, ref?: ForwardedRef<RuleFormRef>) => {
    const { rule, onChange } = props;

    const check = () => !rule?.title?.every((item) => !!item);

    useImperativeHandle(ref, () => ({
      check,
    }));

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
  },
);
