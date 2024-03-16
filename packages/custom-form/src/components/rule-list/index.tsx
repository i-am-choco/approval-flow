import "./index.css";

import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Modal, Row, Select } from "antd";
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
  getRule,
  RuleBuilder,
  SELECT_OPERATORS,
  validator,
} from "../rule-builder";

interface IRuleListProps {
  formConfig: FormItemConfigType[];
  onChange: (value: FormItemConfigType[]) => void;
}
export enum RuleActionEnum {
  add,
  edit,
  copy,
}

type RuleListType = {
  key: string;
  rules: string;
  disabled: boolean;
  value: BaseRuleType[];
};

export const RuleList = React.memo((props: IRuleListProps) => {
  const { formConfig, onChange } = props;

  const [actionType, setActionType] = useState<RuleActionEnum>(
    RuleActionEnum.add,
  );

  const [current, setCurrent] = useState<RuleListType | null>(null);

  const [query, setQuery] = useState<RuleGroupType>(DEFAULT_QUERY);

  const [displayField, setDisplayField] = useState<string[]>([]);

  const formItems = useMemo(() => {
    const bfs = (
      value: FormItemConfigType[],
      path: string,
    ): FormItemConfigType[] => {
      const total: FormItemConfigType[] = [];

      value.length &&
        total.push(
          ...value.map((item) => ({
            ...item,
            rule: {
              ...item.rule,
              label: `${path}${path && "/"}${item.rule.label}`,
            },
          })),
        );
      value.map((item) => {
        const children = bfs(
          item.children || [],
          `${path}${path && "/"}${item.rule.label}`,
        );

        total.push(...children);
      });

      return total;
    };

    return bfs(formConfig, "");
  }, [formConfig]);

  // 列表展示的数据
  const list: RuleListType[] = useMemo(() => {
    const rules = formItems
      .filter((item) => item.rule.displayRule)
      .map((item) => item.rule);

    const group: Record<string, BaseRuleType[] | undefined> = R.groupBy(
      (item: BaseRuleType) => item.displayRuleId ?? "",
      rules,
    );

    const result: RuleListType[] = [];

    R.mapObjIndexed((value: BaseRuleType[], key: string) => {
      result.push({
        key,
        rules: value[0].displayRule || "",
        disabled: !!value[0].displayRuleDisabled,
        value,
      });
    }, group);

    return result;
  }, [formItems]);

  const [open, setOpen] = useState<boolean>(false);

  const [formOpen, setFormOpen] = useState<boolean>(false);

  const handleClose = () => {
    setFormOpen(false);
    setQuery(DEFAULT_QUERY);
    setCurrent(null);
    setDisplayField([]);
  };

  const handleSave = () => {
    if (
      !query.rules.length ||
      query.rules.some(
        (item) => !!R.pathOr(false, ["value"], item) || !displayField.length,
      )
    ) {
      return;
    }
    const displayRule = formatQuery(query, "cel");

    const ids =
      (actionType === RuleActionEnum.edit &&
        current?.value.map((item) => item.id)) ||
      [];

    const update = (value: FormItemConfigType[]): FormItemConfigType[] =>
      value.map((item) => ({
        ...item,
        rule: displayField.includes(item.id)
          ? {
              ...item.rule,
              displayRule,
              displayField: list.length.toString(),
            }
          : ids.includes(item.id)
            ? {
                ...item.rule,
                displayRule: undefined,
                displayRuleId: undefined,
              }
            : item.rule,
        children: item.children && update(item.children),
      }));

    onChange(update(formConfig));
    handleClose();
  };

  const handleDelete = (item: RuleListType) => {
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

  const handleCopy = (value: RuleListType) => {
    setOpen(true);
    setCurrent(value);
    setActionType(RuleActionEnum.copy);
    setQuery(parseCEL(value.rules));
  };

  const handleEdit = (value: RuleListType) => {
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

  const handleAddRule = () => {
    setQuery({ ...query, rules: [...query.rules, getRule()] });
  };

  const transformRuleToText = (rule: string, data: BaseRuleType[]) => {
    const rules: RuleGroupType = parseCEL(rule);

    const getName = (id: string) =>
      formItems.find((item) => item.id === id)?.rule?.label || "undefined";

    const getOperator = (value: string) =>
      SELECT_OPERATORS.find((item) => item.name === value)?.label ||
      "undefined";

    return (
      <div className="custom-form-rule-list-text">
        {rules.rules.map((item, index) => {
          const value = item as {
            field: string;
            value: string;
            operator: string;
          };

          return (
            <p key={index}>
              当{getName(value.field)}
              {getOperator(value.operator)}
              {value.value}
              {index === rules.rules.length - 1 ? "时" : "且"}
            </p>
          );
        })}
        <p>显示{data.map((item) => item.label)}</p>
      </div>
    );
  };

  const footer = (
    <>
      <div className="cancel" onClick={handleClose}>
        取消
      </div>
      <div className="save" onClick={handleSave}>
        保存
      </div>
    </>
  );

  // 字段隐藏规则显示关联条件的字段
  const fields: Field[] = useMemo(
    () =>
      formItems
        .filter(
          (item) =>
            (item.type === "select" || item.type === "multipleSelect") &&
            !displayField.includes(item.id),
        )
        .map((item) => ({
          name: item.rule.id,
          id: item.rule.id,
          label: item.rule.label,
          valueEditorType: "multiselect",
          operators: SELECT_OPERATORS,
          validator,
          values:
            item.rule.options?.map((value) => ({
              label: value,
              name: value,
            })) || [],
        })) || [],
    [displayField, formItems],
  );

  // 字段隐藏规则可控制显示隐藏的字段
  const options = useMemo(() => {
    // 当前条件已选的字段
    const selectedField: string[] = query.rules.map((item) =>
      R.pathOr("", ["field"], item),
    );

    // 规则列表已设置的字段
    const listField = R.flatten(
      R.without(actionType === RuleActionEnum.edit ? [current] : [], list).map(
        (item) => item.value,
      ),
    ).map((item) => item.id);

    return formItems
      .filter(
        (item) =>
          !selectedField.includes(item.id) && !listField.includes(item.id),
      )
      .map((item) => ({
        label: item.rule.label,
        value: item.id,
      }));
  }, [actionType, current, formItems, list, query.rules]);

  return (
    <div className="custom-form-rule-list">
      <p className="custom-form-rule-list-title">字段隱藏規則</p>

      <Button className="custom-form-rule-list-button" onClick={handleAdd}>
        編輯
      </Button>
      <Drawer
        title={"字段隱藏規則"}
        width={960}
        open={open}
        maskClosable={false}
        className="custom-form-fields-drawer"
        onClose={() => setOpen(false)}
      >
        <Button type="primary" onClick={() => setFormOpen(true)}>
          <PlusOutlined />
          添加顯隱規則
        </Button>
        {list?.map((item, index) => (
          <div key={index} className="custom-form-rule-list-item">
            {transformRuleToText(item.rules, item.value)}
            {!item.disabled && (
              <div className="custom-form-rule-list-operation">
                <EditOutlined onClick={() => handleEdit(item)} />
                <CopyOutlined onClick={() => handleCopy(item)} />
                <DeleteOutlined onClick={() => handleDelete(item)} />
              </div>
            )}
          </div>
        ))}
      </Drawer>
      <Modal
        title={"字段隱藏規則"}
        width={750}
        open={formOpen}
        footer={footer}
        maskClosable={false}
        onCancel={handleClose}
        className="custom-form-fields-modal"
      >
        <div className="custom-form-fields-title">
          满足一下所有条件时
          <span onClick={handleAddRule} className="custom-form-add-condition">
            添加條件
          </span>
        </div>
        <Row style={{ cursor: "default", marginBottom: 8 }}>
          <div style={{ width: 180, marginRight: 16 }}>字段</div>
          <div style={{ width: 180, marginRight: 16 }}>關係</div>
          <div>目標值</div>
        </Row>
        <RuleBuilder fields={fields} query={query} onChange={setQuery} />
        <p>顯示以下字段</p>
        <Select
          className="custom-form-fields-select"
          style={{ width: "100%" }}
          mode="multiple"
          options={options}
          value={displayField}
          onChange={(value) => {
            setDisplayField(value);
          }}
        />
      </Modal>
    </div>
  );
});
