import "./index.css";

import React from "react";
import { NodeProps } from "reactflow";

import { BaseDataType, CardType } from "../../types/index.types";
import { Card } from "../card/card";

export const CarbonCopy = <T extends BaseDataType>(
  props: NodeProps<T> & CardType,
) => <Card title="CC" {...props} className={`${props.className} carbonCopy`} />;
