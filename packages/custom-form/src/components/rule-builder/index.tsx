import { QueryBuilderAntD } from "@react-querybuilder/antd";
import React from "react";
import QueryBuilder from "react-querybuilder";

export const RuleBuilder = React.memo(() => {
  return (
    <QueryBuilderAntD>
      <QueryBuilder />
    </QueryBuilderAntD>
  );
});
