import "./tabs.css";

import React from "react";

interface ITabsProps {
  value: string;
  options: Array<{
    value: string;
    label: string;
    render?: () => React.ReactNode;
  }>;
  onChange: (value: string) => void;
}

export const Tabs = React.memo((props: ITabsProps) => {
  const { value, options, onChange } = props;

  return (
    <div className="custom-form-tabs">
      <div className="custom-form-tabs-header">
        {options.map((item) => (
          <div
            key={item.value}
            className={`${(value === item.value && "custom-form-tab-active") || ""} custom-form-tab-item`}
            onClick={() => {
              onChange(item.value);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="custom-form-tabs-content">
        {options.map((item) => (
          <div
            key={`${item.value}-content`}
            style={{ display: (item.value === value && "block") || "none" }}
          >
            {item.render && item.render()}
          </div>
        ))}
      </div>
    </div>
  );
});
