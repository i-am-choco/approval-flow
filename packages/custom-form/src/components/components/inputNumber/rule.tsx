import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../../types/index.types";
import { RuleNumberFormat } from "../../rules/ruleNumberFormat";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const InputNumberRule = React.forwardRef(
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
          onChange={(title) =>
            onChange &&
            onChange({ ...rule, title, label: title?.join("-") || rule?.label })
          }
        />
        <RuleTips
          value={rule?.tips}
          onChange={(tips) => onChange && onChange({ ...rule, tips })}
        />
        <RuleNumberFormat
          checked={rule?.decimals || false}
          onChange={(decimals, precision) =>
            onChange && onChange({ ...rule, decimals, precision })
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
