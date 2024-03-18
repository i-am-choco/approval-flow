import "../index.css";

import { Radio, Select as AntdSelect } from "antd";
import { isNil } from "ramda";
import React from "react";

import { IRenderFormProps } from "../../..";

export const Select = React.memo((props: IRenderFormProps) => {
  const { rule } = props;

  return (
    <div>
      <p>{rule?.title?.[0] || ""}</p>
      {rule?.display === "drop" ? (
        <AntdSelect
          placeholder="請選擇"
          disabled
          style={{ width: "100%", pointerEvents: "none" }}
        />
      ) : (
        <Radio.Group
          className="custom-form-component-select-radio-group"
          disabled
          options={rule?.options
            ?.filter((item) => !isNil(item))
            .map((item, key) => ({ label: item, value: item, key }))}
        />
      )}
    </div>
  );
});
