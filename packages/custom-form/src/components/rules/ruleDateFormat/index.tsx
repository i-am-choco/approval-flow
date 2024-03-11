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
    <div>
      <p>格式</p>
      <Select
        value={value}
        onChange={(e) => onChange(e, checked)}
        options={[
          { value: "mm/dd/yyyy", label: "mm/dd/yyyy" },
          { value: "mm/dd/yyyy hh:mm", label: "mm/dd/yyyy hh:mm" },
        ]}
      />
      <p>自动计算时长</p>
      <Switch checked={checked} onChange={(e) => onChange(value, e)} />
    </div>
  );
});
