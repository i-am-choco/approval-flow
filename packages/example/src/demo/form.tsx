// import { Button } from "antd";
import { CustomForm, CustomFormRef } from "custom-form";
import React, { useRef } from "react";
export const Form = () => {
  const ref = useRef<CustomFormRef | null>(null);

  return (
    <div>
      {/* <Button
        onClick={() => {
          console.log(ref.current?.getFormConfigData());
        }}
      >
        保存
      </Button> */}
      <CustomForm ref={ref} width="100%" height="100vh" />
    </div>
  );
};
