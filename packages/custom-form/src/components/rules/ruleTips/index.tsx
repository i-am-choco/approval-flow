import { Input } from "antd";
import React from "react";
export const RuleTips = React.memo(() => {
  return (
    <div>
      <p>提示文字</p>
      <Input.TextArea showCount maxLength={1000} />
    </div>
  );
});
