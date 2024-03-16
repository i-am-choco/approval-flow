import { Input } from "antd";
import { update } from "ramda";
import React from "react";
interface IRuleTitleProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const RuleTitle = React.memo((props: IRuleTitleProps) => {
  const { value, onChange } = props;

  const handleChange = (text: string, index: number) => {
    onChange(update(index, text, value));
  };

  return (
    <div>
      {value.map((item, index) => (
        <div className="custom-form-rule-item" key={`rule-title-${index}`}>
          <p className="custom-form-rule-title">
            <span className="required">*</span>
            <span>{value.length === 1 ? "標題" : `標題${index + 1}`}</span>
          </p>
          <Input
            status={!item ? "error" : ""}
            count={{ show: true, max: 50 }}
            value={item}
            placeholder="請輸入"
            onChange={(e) => handleChange(e.target.value, index)}
          />
        </div>
      ))}
    </div>
  );
});
