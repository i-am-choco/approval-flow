import { Input } from "antd";
import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../../types/index.types";
import { RuleTitle } from "../../rules/ruleTitle";
export const ListRule = React.forwardRef(
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
        <p>動作名稱</p>
        <Input
          value={rule?.action}
          onChange={(e) =>
            onChange && onChange({ ...rule, action: e.target.value })
          }
          count={{ show: true, max: 50 }}
        />
      </div>
    );
  },
);
