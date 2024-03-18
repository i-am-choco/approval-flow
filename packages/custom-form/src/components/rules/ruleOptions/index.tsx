import { DeleteOutlined, HolderOutlined } from "@ant-design/icons";
import { Input, Radio, Row, Select } from "antd";
import * as R from "ramda";
import React, { useState } from "react";
interface IRuleOptionsProps {
  mode: "custom" | "module";
  display: "drop" | "tile";
  value: string;
  options: Array<string | undefined>;
  moduleOptions?: Array<string | undefined>;
  onDisplayChange: (value: "drop" | "tile") => void;
  onChange: (value: Array<string | undefined>) => void;
}
export const RuleOptions = React.memo((props: IRuleOptionsProps) => {
  const {
    mode,
    display,
    value,
    options,
    moduleOptions,
    onChange,
    onDisplayChange,
  } = props;

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
    <div className="custom-form-rule-select">
      <div className="custom-form-rule-item">
        <p className="custom-form-rule-title">选项</p>
        <Select
          style={{ width: "100%", marginBottom: 8 }}
          options={[{ value: "custom", label: "自定義" }]}
          value={value}
        />
        {options.map((item, index) => {
          return (
            <Row
              className="custom-form-rule-select-item"
              key={`rule-options-${index}`}
              draggable={draggingIndex === index}
              onDrop={() => handleDrop(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={() => setDraggingIndex(null)}
            >
              <Input
                disabled={mode === "module"}
                value={item}
                style={{ flex: 1 }}
                onChange={(e) => handleEdit(e.target.value, index)}
              />
              <HolderOutlined
                className="icont"
                style={{ cursor: "grab" }}
                onMouseDown={() => setDraggingIndex(index)}
              />
              <DeleteOutlined
                className="icont"
                onClick={() => handleDelete(index)}
              />
            </Row>
          );
        })}
        <span
          className={
            mode === "module" && options.length === moduleOptions?.length
              ? "options-add-disabled"
              : "options-add"
          }
          onClick={hanldeAdd}
        >
          添加选项
        </span>
      </div>
      <div className="custom-form-rule-item">
        <p className="custom-form-rule-title">展示方式</p>
        <Radio.Group
          value={display}
          onChange={(e) => onDisplayChange(e.target.value)}
          options={[
            { value: "drop", label: "下拉" },
            { value: "tile", label: "平铺" },
          ]}
        />
      </div>
    </div>
  );
});
