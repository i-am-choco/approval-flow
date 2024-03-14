import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../..";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTitle } from "../../rules/ruleTitle";

export const UploadRule = React.forwardRef(
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
  },
);
