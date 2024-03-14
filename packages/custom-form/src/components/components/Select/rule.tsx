import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../../types/index.types";
import { RuleOptions } from "../../rules/ruleOptions";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";

export const SelectRule = React.forwardRef(
  (props: IRenderRuleFormProps, ref?: ForwardedRef<RuleFormRef>) => {
    const { rule, onChange } = props;

    const check = () => !rule?.title?.every((item) => !!item);

    useImperativeHandle(ref, () => ({
      check,
    }));

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
  },
);
