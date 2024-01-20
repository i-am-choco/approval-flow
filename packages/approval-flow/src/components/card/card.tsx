import "./index.css";

import React from "react";
import { Handle, NodeProps } from "reactflow";

import { BaseDataType, ICardProps } from "../../types/index.types";

export const Card = React.memo(
  <T extends BaseDataType>(props: ICardProps & NodeProps<T>) => (
    <>
      <div className={`${props.className ?? ""} card`} style={props.styles}>
        <div className="title">{props.data.title || props.title}</div>
        <div className="content">
          {(props.render && props.render()) || props.data?.description}
        </div>
      </div>
      {props.targetPosition && (
        <Handle
          type="target"
          position={props.targetPosition}
          isConnectable={false}
        />
      )}
      {props.sourcePosition && (
        <Handle
          type="source"
          position={props.sourcePosition}
          isConnectable={false}
        />
      )}
    </>
  ),
);
