import { Input, Switch } from "antd";
import React, { ForwardedRef, useImperativeHandle } from "react";

import { IRenderRuleFormProps, RuleFormRef } from "../../../types/index.types";

export const DescriptionRule = React.forwardRef(
  (props: IRenderRuleFormProps, ref?: ForwardedRef<RuleFormRef>) => {
    const { rule, onChange } = props;

    useImperativeHandle(ref, () => ({
      check: () => false,
    }));

    return (
      <div>
        <p>说明文字</p>
        <Input.TextArea
          value={rule?.description || ""}
          onChange={(e) =>
            onChange && onChange({ ...rule, description: e.target.value })
          }
          count={{ show: true, max: 1000 }}
        />
        <p>仅在申请页面显示</p>
        <Switch
          value={rule?.onlyApplication || false}
          onChange={(onlyApplication) =>
            onChange && onChange({ ...rule, onlyApplication })
          }
        />
      </div>
    );
  },
);
