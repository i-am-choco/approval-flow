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
        <AntdSelect />
      ) : (
        <Radio.Group
          options={rule?.options
            ?.filter((item) => !isNil(item))
            .map((item, key) => ({ label: item, value: item, key }))}
        />
      )}
    </div>
  );
});
