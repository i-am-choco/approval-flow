import "./index.css";

import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Drawer, Select } from "antd";
import * as R from "ramda";
import React, { useMemo, useState } from "react";
import {
  Field,
  formatQuery,
  parseCEL,
  RuleGroupType,
} from "react-querybuilder";

import { BaseRuleType, FormItemConfigType } from "../../types/index.types";
import {
  DEFAULT_QUERY,
  RuleBuilder,
  SELECT_OPERATORS,
  validator,
} from "../rule-builder";

interface IRuleListProps<Rule extends BaseRuleType> {
  formConfig: FormItemConfigType<Rule>[];
  onChange: (value: FormItemConfigType<Rule>[]) => void;
}
export enum RuleActionEnum {
  add,
  edit,
  copy,
}

type RuleListType<T extends BaseRuleType> = {
  key: string;
  rules: string;
  disabled: boolean;
  value: T[];
};

// TODO: 兼容嵌套组件的表单字段控制
export const RuleList = React.memo(
  <Rule extends BaseRuleType>(props: IRuleListProps<Rule>) => {
    const { formConfig, onChange } = props;

    const [actionType, setActionType] = useState<RuleActionEnum>(
      RuleActionEnum.add,
    );

    const [current, setCurrent] = useState<RuleListType<Rule> | null>(null);

    const [query, setQuery] = useState<RuleGroupType>(DEFAULT_QUERY);

    const [displayField, setDisplayField] = useState<string[]>([]);

    // 列表展示的数据
    const list: RuleListType<Rule>[] = useMemo(() => {
      const rules = formConfig
        .filter((item) => item.rule.displayRule)
        .map((item) => item.rule);

      const group: Record<string, Rule[] | undefined> = R.groupBy(
        (item: Rule) => item.displayRuleId ?? "",
        rules,
      );

      const result: RuleListType<Rule>[] = [];

      R.mapObjIndexed((value: Rule[], key: string) => {
        result.push({
          key,
          rules: value[0].displayRule || "",
          disabled: !!value[0].displayRuleDisabled,
          value,
        });
      }, group);

      return result;
    }, [formConfig]);

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
      setOpen(false);
      setQuery(DEFAULT_QUERY);
      setCurrent(null);
      setDisplayField([]);
    };

    const handleSave = () => {
      const displayRule = formatQuery(query, "cel");

      if (
        actionType === RuleActionEnum.add ||
        actionType === RuleActionEnum.copy
      ) {
        onChange(
          formConfig.map((item) =>
            displayField.includes(item.id)
              ? {
                  ...item,
                  rule: {
                    ...item.rule,
                    displayRule,
                    displayRuleId: list.length.toString(),
                  },
                }
              : item,
          ),
        );
      } else {
        const ids = current?.value.map((item) => item.id) || [];

        onChange(
          formConfig.map((item) =>
            displayField.includes(item.id)
              ? { ...item, rule: { ...item.rule, displayRule } }
              : ids.includes(item.id)
                ? {
                    ...item,
                    rule: {
                      ...item.rule,
                      displayRule: undefined,
                      displayRuleId: undefined,
                    },
                  }
                : item,
          ),
        );
      }
      handleClose();
    };

    const handleDelete = (item: RuleListType<Rule>) => {
      const ids = item.value.map((item) => item.id);

      const result = formConfig.map((item) =>
        ids.includes(item.id)
          ? {
              ...item,
              rule: {
                ...item.rule,
                displayRule: undefined,
                displayRuleId: undefined,
              },
            }
          : item,
      );

      onChange(result);
    };

    const handleCopy = (value: RuleListType<Rule>) => {
      setOpen(true);
      setCurrent(value);
      setActionType(RuleActionEnum.copy);
      setQuery(parseCEL(value.rules));
    };

    const handleEdit = (value: RuleListType<Rule>) => {
      setOpen(true);
      setCurrent(value);
      setActionType(RuleActionEnum.edit);
      const rule = parseCEL(value.rules);

      const values = value.value.map((item) => item.id);

      setQuery(rule);
      setDisplayField(values);
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

    const footer = (
      <div>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
    );

    const fields: Field[] = useMemo(
      () =>
        formConfig
          .filter(
            (item) =>
              (item.type === "Select" || item.type === "Multiselect") &&
              !displayField.includes(item.id),
          )
          .map((item) => ({
            name: item.rule.id,
            id: item.rule.id,
            label: item.rule.name,
            valueEditorType: "multiselect",
            operators: SELECT_OPERATORS,
            validator,
            values:
              item.rule.options?.map((item) => ({
                ...item,
                name: item.label,
              })) || [],
          })) || [],
      [displayField, formConfig],
    );

    const options = useMemo(() => {
      const selectedField: string[] = query.rules.map((item) =>
        R.pathOr("", ["field"], item),
      );

      const listField = R.flatten(
        R.without(
          actionType === RuleActionEnum.edit ? [current] : [],
          list,
        ).map((item) => item.value),
      ).map((item) => item.id);

      return formConfig
        .filter(
          (item) =>
            !selectedField.includes(item.id) && !listField.includes(item.id),
        )
        .map((item) => ({
          label: item.rule.name,
          value: item.id,
        }));
    }, [actionType, current, formConfig, list, query.rules]);

    return (
      <div className="custom-form-rule-list">
        <p>字段隱藏規則</p>
        {list?.map((item, index) => (
          <div key={index} className="custom-form-rule-list-item">
            <div>{item.rules}</div>
            {!item.disabled && (
              <div className="custom-form-rule-list-operation">
                <EditOutlined onClick={() => handleEdit(item)} />
                <CopyOutlined onClick={() => handleCopy(item)} />
                <DeleteOutlined onClick={() => handleDelete(item)} />
              </div>
            )}
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
          <RuleBuilder fields={fields} query={query} onChange={setQuery} />
          <p>显示以下字段</p>
          <Select
            style={{ width: 300 }}
            mode="multiple"
            options={options}
            value={displayField}
            onChange={(value) => {
              setDisplayField(value);
            }}
          />
        </Drawer>
      </div>
    );
  },
);
