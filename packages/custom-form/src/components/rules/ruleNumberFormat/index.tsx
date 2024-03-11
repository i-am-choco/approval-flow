import { Checkbox, InputNumber, Row, Select } from "antd";
import React from "react";

interface IRuleNumberFormatProps {
  value?: number;
  checked: boolean;
  onChange: (checked: boolean, value?: number) => void;
}

export const RuleNumberFormat = React.memo((props: IRuleNumberFormatProps) => {
  const { value, checked, onChange } = props;

  return (
    <div>
      <p>格式</p>
      <Select
        options={[{ value: "number", label: "數值" }]}
        defaultValue={"number"}
      />
      <Row justify="start" align="middle">
        <Checkbox
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked, e.target.checked ? value : 0)
          }
        />
        <span>保留小數位數</span>
        {checked && (
          <InputNumber
            value={value}
            onChange={(e) => onChange(checked, e || 0)}
            precision={0}
          />
        )}
      </Row>
    </div>
  );
});
