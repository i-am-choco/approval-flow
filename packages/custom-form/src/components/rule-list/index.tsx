import "./index.css";

import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Drawer, Select } from "antd";
import React, { useMemo, useState } from "react";

import { BaseRuleType, FormItemConfigType } from "../../types/index.types";
import { RuleBuilder } from "../rule-builder";

interface IRuleListProps<Rule extends BaseRuleType> {
  formConfig: FormItemConfigType<Rule>[];
  onChange: (value: FormItemConfigType<Rule>[]) => void;
}
export enum RuleActionEnum {
  add,
  edit,
  copy,
}

export const RuleList = React.memo(
  <Rule extends BaseRuleType>(props: IRuleListProps<Rule>) => {
    const { formConfig, onChange } = props;

    const [actionType, setActionType] = useState<RuleActionEnum>(
      RuleActionEnum.add,
    );

    const [current, setCurrent] = useState<Rule | null>(null);

    // 列表展示的数据
    const list: Rule[] = useMemo(
      () =>
        formConfig
          .filter((item) => item.rule.displayRule)
          .map((item) => item.rule) || [],
      [formConfig],
    );

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      setOpen(false);
      console.log(current, actionType);
    };

    const handleDelete = (id: string) => {
      const result = formConfig.map((item) =>
        item.id === id
          ? { ...item, rule: { ...item.rule, displayRule: undefined } }
          : item,
      );

      onChange(result);
    };

    const handleCopy = (value: Rule) => {
      setOpen(true);
      setCurrent(value);
      setActionType(RuleActionEnum.copy);
    };

    const handleEdit = (value: Rule) => {
      setOpen(true);
      setCurrent(value);
      setActionType(RuleActionEnum.edit);
    };

    const handleAdd = () => {
      setOpen(true);
      setActionType(RuleActionEnum.add);
    };

    const title = useMemo(() => {
      switch (actionType) {
        case RuleActionEnum.add:
          return "增加";
        case RuleActionEnum.edit:
          return "编辑";
        case RuleActionEnum.copy:
          return "复制";
        default:
          return "";
      }
    }, [actionType]);

    const footer = useMemo(
      () => (
        <div>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      ),
      [],
    );

    return (
      <div className="custom-form-rule-list">
        <p>字段隱藏規則</p>
        {list?.map((item) => (
          <div key={`${item.id}`} className="custom-form-rule-list-item">
            <div>{item.displayRule}</div>
            <div className="custom-form-rule-list-operation">
              <EditOutlined onClick={() => handleEdit(item)} />
              <CopyOutlined onClick={() => handleCopy(item)} />
              <DeleteOutlined onClick={() => handleDelete(item.id)} />
            </div>
          </div>
        ))}
        <Button onClick={handleAdd}>添加顯隱規則</Button>
        <Drawer
          title={title}
          width={980}
          open={open}
          footer={footer}
          onClose={handleClose}
        >
          <div>满足一下所有条件时</div>
          <RuleBuilder />
          <p>显示以下字段</p>
          <Select style={{ width: 300 }} />
        </Drawer>
      </div>
    );
  },
);
