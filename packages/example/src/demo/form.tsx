import { Button } from "antd";
import { CustomForm, CustomFormRef } from "custom-form";
import React, { useRef } from "react";
export const Form = () => {
  const ref = useRef<CustomFormRef | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        onClick={() => {
          console.log(ref.current?.getFormConfigData());
        }}
      >
        保存
      </Button>
      <CustomForm
        initalValue={[
          {
            id: "50e53c422bbc41efaf2ddf806affca37",
            type: "textArea",
            rule: {
              id: "50e53c422bbc41efaf2ddf806affca37",
              label: "多行輸入框",
              title: ["多行輸入框"],
              required: false,
            },
          },
        ]}
        ref={ref}
        width="100%"
        height="100%"
      />
    </div>
  );
};
