import { Checkbox } from "antd";
import React from "react";
interface IRuleRequiredProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}
export const RuleRequired = React.memo((props: IRuleRequiredProps) => {
  const { checked, onChange } = props;

  return (
    <div className="custom-form-rule-item">
      <p className="custom-form-rule-title">校验</p>
      <Checkbox
        checked={checked}
        title="必填"
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
});
