import { Input } from "antd";
import React from "react";

interface IRuleTitleProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const RuleTitle = React.memo((props: IRuleTitleProps) => {
  const { value } = props;

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
          />
        </div>
      ))}
    </div>
  );
});
