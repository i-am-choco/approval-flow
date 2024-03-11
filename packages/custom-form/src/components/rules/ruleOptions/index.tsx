import { DeleteOutlined, HolderOutlined } from "@ant-design/icons";
import { Input, Radio, Row, Select } from "antd";
import * as R from "ramda";
import React, { useState } from "react";
interface IRuleOptionsProps {
  mode: "custom" | "module";
  value: string;
  options: Array<string | undefined>;
  moduleOptions?: Array<string | undefined>;
  onChange: (value: Array<string | undefined>) => void;
}
export const RuleOptions = React.memo((props: IRuleOptionsProps) => {
  const { mode, value, options, moduleOptions, onChange } = props;

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleEdit = (text: string | undefined, index: number) => {
    onChange(R.update(index, text, options));
  };

  const handleDelete = (index: number) => {
    onChange(R.remove(index, 1, options));
  };

  const hanldeAdd = () => {
    if (mode === "custom") {
      onChange([...options, undefined]);
    } else {
      if (options.length === moduleOptions?.length) return;
      const others =
        moduleOptions?.filter((item) => !options.includes(item)) || [];

      onChange([...options, ...others]);
    }
  };

  const handleDrop = (toIndex: number) => {
    draggingIndex && onChange(R.move(draggingIndex, toIndex, options));
  };

  return (
    <div>
      <p>选项</p>
      <Select options={[{ value: "1", label: "自定義" }]} value={value} />
      {options.map((item, index) => {
        return (
          <Row
            key={`rule-options-${index}`}
            draggable={draggingIndex === index}
            onDrop={() => handleDrop(index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={() => setDraggingIndex(null)}
          >
            <Input
              disabled={mode === "module"}
              value={item}
              onChange={(e) => handleEdit(e.target.value, index)}
            />
            <HolderOutlined onMouseDown={() => setDraggingIndex(index)} />
            <DeleteOutlined onClick={() => handleDelete(index)} />
          </Row>
        );
      })}
      <span onClick={hanldeAdd}>添加选项</span>
      <p>展示方式</p>
      <Radio.Group
        options={[
          { value: "select", label: "下拉" },
          { value: "radio", label: "平铺" },
        ]}
      />
    </div>
  );
});