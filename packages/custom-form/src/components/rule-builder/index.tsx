import "./index.css";

import { DeleteOutlined } from "@ant-design/icons";
import { QueryBuilderAntD } from "@react-querybuilder/antd";
import React, { useCallback } from "react";
import QueryBuilder, {
  ActionProps,
  defaultValidator,
  Field,
  RuleGroupType,
  RuleType,
} from "react-querybuilder";

export const getRule = () => ({
  id: crypto.randomUUID(),
  field: "",
  operator: "",
  value: "",
});

export const DEFAULT_QUERY: RuleGroupType = {
  id: crypto.randomUUID(),
  combinator: "and",
  rules: [getRule()],
};

export const SELECT_OPERATORS = [
  { name: "contains", label: "包含任意" },
  { name: "=", label: "完全等于" },
];

export const validator = (r: RuleType) => {
  if (Array.isArray(r.value)) {
    return r.value.length > 0;
  }

  return !!r.field && !!r.operator && !!r.value;
};

interface IRuleBuilderProps {
  fields: Field[];
  query: RuleGroupType;
  onChange: (value: RuleGroupType) => void;
}

export const RuleBuilder = React.memo((props: IRuleBuilderProps) => {
  const { fields, query, onChange } = props;

  const removeRuleAction = useCallback(
    (props: ActionProps) =>
      query.rules?.length > 1 && (
        <DeleteOutlined
          className="custom-form-query-builder-delete"
          onClick={props.handleOnClick}
        />
      ),
    [query.rules],
  );

  return (
    <QueryBuilderAntD>
      <QueryBuilder
        query={query}
        fields={fields}
        controlClassnames={{
          addRule: "custom-form-query-builder-hidden",
          addGroup: "custom-form-query-builder-hidden",
          combinators: "custom-form-query-builder-hidden",
          rule: "custom-form-query-builder-rule",
          fields: "custom-form-query-builder-fields",
          operators: "custom-form-query-builder-operator",
          value: "custom-form-query-builder-value",
        }}
        validator={defaultValidator}
        controlElements={{
          removeRuleAction,
        }}
        onQueryChange={onChange}
      />
    </QueryBuilderAntD>
  );
});
