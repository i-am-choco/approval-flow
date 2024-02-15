import "./index.css";

import { CloseOutlined, CopyOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Handle, NodeProps } from "reactflow";

import { BaseDataType, CardType } from "../../types/index.types";

export const Card = React.memo(
  <T extends BaseDataType>(props: CardType & NodeProps<T>) => {
    const [hidden, setHidden] = useState<boolean>(true);

    const handleDelete = () => {
      props.onDelete && props.onDelete(props.data.id);
    };

    return (
      <>
        <div
          className={`card ${props.className ?? ""}`}
          style={props.styles}
          onMouseOver={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}
        >
          <div className="title" style={props.titleStyles}>
            {props.data.name || props.title}
            <div
              className="button"
              style={{ display: hidden ? "none" : "flex" }}
            >
              {props.displayCopy && <CopyOutlined style={{ marginRight: 4 }} />}
              {props.displayDelete && <CloseOutlined onClick={handleDelete} />}
            </div>
          </div>
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
    );
  },
);
