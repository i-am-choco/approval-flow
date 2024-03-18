import { Select, Switch } from "antd";
import React from "react";

interface IRuleDateFormatProps {
  value: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
}

export const RuleDateFormat = React.memo((props: IRuleDateFormatProps) => {
  const { value, checked, onChange } = props;

  return (
    <div className="custom-form-rule-item">
      <p className="custom-form-rule-title">格式</p>
      <Select
        value={value}
        style={{ width: "100%", marginBottom: 8 }}
        onChange={(e) => onChange(e, checked)}
        options={[
          { value: "mm/dd/yyyy", label: "mm/dd/yyyy" },
          { value: "mm/dd/yyyy hh:mm", label: "mm/dd/yyyy hh:mm" },
        ]}
      />
      <p className="custom-form-rule-title">自动计算时长</p>
      <Switch checked={checked} onChange={(e) => onChange(value, e)} />
    </div>
  );
});
