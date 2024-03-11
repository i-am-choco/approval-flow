import React from "react";

import { IRenderRuleFormProps } from "../../../types/index.types";
import { RuleDateFormat } from "../../rules/ruleDateFormat";
import { RuleNumberFormat } from "../../rules/ruleNumberFormat";
import { RuleOptions } from "../../rules/ruleOptions";
import { RuleRequired } from "../../rules/ruleRequired";
import { RuleTips } from "../../rules/ruleTips";
import { RuleTitle } from "../../rules/ruleTitle";
export const ListRule = React.memo((props: IRenderRuleFormProps) => {
  const { rule, ruleId, onChange } = props;

  return (
    <div>
      <RuleTitle value={["列表", "列表1"]} onChange={() => {}} />
      <RuleTips />
      <RuleRequired
        checked={true}
        onChange={(value) => {
          console.log(value);
        }}
      />
      <RuleNumberFormat checked={true} onChange={() => {}} />
      <RuleDateFormat value={"mm/dd/yyyy"} checked={true} onChange={() => {}} />
      <RuleOptions
        mode="custom"
        value={"1"}
        onChange={() => {}}
        options={["1", "2"]}
      />
    </div>
  );
});
