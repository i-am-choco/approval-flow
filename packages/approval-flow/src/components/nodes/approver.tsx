import "./index.css";

import React from "react";
import { NodeProps } from "reactflow";

import { BaseDataType, CardType } from "../../types/index.types";
import { Card } from "../card/card";

export const Approver = <T extends BaseDataType>(
  props: NodeProps<T> & CardType,
) => (
  <Card title="Approver" {...props} className={`${props.className} approver`} />
);
