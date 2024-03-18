import "./index.css";

import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons";
import React, { ForwardedRef } from "react";

import { COMPONENTS } from "./components/components";
import { FormItem } from "./components/formItem";
import { RuleList } from "./components/rule-list";
import { Tabs } from "./components/tabs/tabs";
import { CustomFormRef, ICustomFormProps } from "./types/index.types";
import { UseStore } from "./use-store";

const Empty = () => (
  <p className="custom-form-canvas-empty">
    <PlusOutlined /> 點擊或拖拽空間添加到此處
  </p>
);

export const CustomForm = React.forwardRef(
  (props: ICustomFormProps, ref: ForwardedRef<CustomFormRef>) => {
    const { width, height } = props;

    const {
      form,
      draggingId,
      tabKey,
      category,
      notAllowed,
      setTabKey,
      setForm,
      handleUpdateDraggingId,
      handleCursorNotAllowed,
      handleRenderRuleForm,
      handleCanvasDragOver,
      handleCanvasDrop,
      handleComponentDragStart,
    } = UseStore(props, ref);

    // 右侧栏菜单
    const tabsOptions = [
      {
        value: "control",
        label: "控件屬性",
        render: handleRenderRuleForm,
      },
      {
        value: "form",
        label: "表單屬性",
        render: () => <RuleList formConfig={form} onChange={setForm} />,
      },
    ];

    return (
      <div className="custom-form-layout" style={{ width, height }}>
        <div className="custom-form-left-sider">
          <div className="custom-form-left-sider-header">控件</div>
          <div className="custom-form-component-layout">
            {category.map((item) => (
              <div key={item.type}>
                <div className="custom-form-component-category">
                  {item.name}
                </div>
                <div className="custom-form-component-category-layout">
                  {item.component.map(({ type, id, title, icont }) => (
                    <div
                      className="custom-form-component"
                      key={type}
                      id={id}
                      draggable={!notAllowed}
                      style={{
                        cursor: notAllowed ? "not-allowed" : "grab",
                      }}
                      onDragStart={() => handleComponentDragStart(id)}
                    >
                      {icont || <AppstoreOutlined />}
                      <span className="custom-form-component-name">
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="custom-form-canvas-layout">
          <div
            id="custom-form-canvas"
            onDragLeave={handleCursorNotAllowed}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
          >
            <div style={{ margin: 16 }}>
              {form.length ? (
                form.map((item) => (
                  <FormItem
                    key={item.id}
                    current={item}
                    brother={form}
                    componentList={COMPONENTS}
                    onChange={setForm}
                    draggingId={draggingId}
                    onChangeDraggingId={handleUpdateDraggingId}
                  />
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
        <div className="custom-form-right-sider">
          <Tabs value={tabKey} options={tabsOptions} onChange={setTabKey} />
        </div>
      </div>
    );
  },
);
