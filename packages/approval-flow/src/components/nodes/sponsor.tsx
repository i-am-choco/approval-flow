import "./index.css";

import React from "react";
import { NodeProps } from "reactflow";

import { BaseDataType, CardType } from "../../types/index.types";
import { Card } from "../card/card";

export const Sponsor = <T extends BaseDataType>(
  props: NodeProps<T> & CardType,
) => (
  <Card
    title="Sponsor"
    {...props}
    className={`${props.className} sponsor`}
    targetPosition={undefined}
  />
);
