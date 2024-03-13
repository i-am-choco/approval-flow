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
        <div key={`rule-title-${index}`}>
          <p>
            <span>*</span>
            <span>{value.length === 1 ? "标题" : `标题${index + 1}`}</span>
          </p>
          <Input
            count={{ show: true, max: 50 }}
            value={item}
            placeholder="请输入"
            onChange={(e) => handleChange(e.target.value, index)}
          />
        </div>
      ))}
    </div>
  );
});
