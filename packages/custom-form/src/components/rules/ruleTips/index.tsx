import { Input } from "antd";
import React from "react";
export const RuleTips = React.memo(
  (props: { value?: string; onChange: (value?: string) => void }) => (
    <div className="custom-form-rule-item">
      <p className="custom-form-rule-title">提示文字</p>
      <Input.TextArea
        placeholder="請輸入"
        value={props?.value}
        onChange={(e) => props.onChange(e.target.value)}
        showCount
        maxLength={1000}
      />
    </div>
  ),
);
