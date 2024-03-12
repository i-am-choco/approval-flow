import { Input, Switch } from "antd";
import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";

export const DescriptionRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, onChange } = props;

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
});
