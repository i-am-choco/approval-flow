import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../..";
import { RuleOptions } from "../../rules/ruleOptions";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const MultipleSelectRule = React.forwardRef(
  (props: IRenderRuleFormProps, ref?: ForwardedRef<RuleFormRef>) => {
    const { rule, onChange } = props;

    const check = () => !rule?.title?.every((item) => !!item);
    // todo: 这个需要确定是不是必填
    // !!rule.options?.every((item) => !!item);

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
  },
);
