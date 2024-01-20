import "./index.css";

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { BaseDataType, SponsorType } from "../../types/index.types";

export const Sponsor = <T extends BaseDataType>(
  props: NodeProps<T> & SponsorType,
) => {
  const description = () => <div>{props.data?.description}</div>;

  return (
    <>
      <div className={props.className || "sponsor"} style={props.styles}>
        <div className="title">{props.data.title || "Sponsor"}</div>
        <div className="content">
          {(props.render && props.render()) || description()}
        </div>
      </div>
      <Handle
        type="source"
        position={props.sourcePosition || Position.Bottom}
        isConnectable={false}
      />
    </>
  );
};
