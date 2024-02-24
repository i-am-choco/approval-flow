import React from "react";

export const Input = React.memo(() => {
  return (
    <div>
      <div>单行输入框</div>
      <input placeholder="请输入" />
    </div>
  );
});
