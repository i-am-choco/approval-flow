import { UploadOutlined } from "@ant-design/icons";
import React from "react";

import { IRenderFormProps } from "../../..";

export const Upload = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div className="custom-form-component-upload">
      <p>{rule?.title?.[0] || ""}</p>
      <div className="upload-button">
        <UploadOutlined style={{ marginRight: 4 }} /> 上传
      </div>
    </div>
  );
});
