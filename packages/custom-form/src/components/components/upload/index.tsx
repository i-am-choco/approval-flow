import React from "react";

import { IRenderFormProps } from "../../..";

export const Upload = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div>
      <p>{rule?.title?.[0] || ""}</p>
      <p>上传</p>
    </div>
  );
});
