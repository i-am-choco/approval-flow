import "./index.css";

import { QueryBuilderAntD } from "@react-querybuilder/antd";
import React, { useMemo, useState } from "react";
import QueryBuilder, {
  formatQuery,
  parseCEL,
  RuleGroupType,
} from "react-querybuilder";

const defaultQuery: RuleGroupType = {
  id: crypto.randomUUID(),
  combinator: "and",
  rules: [],
};

export const RuleBuilder = React.forwardRef(() => {
  const [query, setQuery] = useState<RuleGroupType>(defaultQuery);

  const value = useMemo(() => {
    return formatQuery(query, "cel");
  }, [query]);

  useMemo(() => {
    console.log(parseCEL(value));
  }, [value]);

  return (
    <QueryBuilderAntD>
      <QueryBuilder
        query={query}
        controlClassnames={{
          addGroup: "custom-form-query-builder-hidden",
          combinators: "custom-form-query-builder-hidden",
          rule: "custom-form-query-builder-rule",
        }}
        onQueryChange={(q: RuleGroupType) => setQuery(q)}
      />
    </QueryBuilderAntD>
  );
});
