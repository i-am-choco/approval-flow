import "./index.css";

import React from "react";

import { IRenderFormProps } from "../../..";

export const List = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div className="custom-form-component-list">
      <p>{rule?.title?.[0] || ""}</p>
    </div>
  );
});
