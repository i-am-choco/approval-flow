import "reactflow/dist/style.css";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { Edge, Node } from "reactflow";

import { DataType } from "./approval-flow.types";

interface IApprovalFlowProps {
  data: DataType[];
}

export const ApprovalFlow = (props: IApprovalFlowProps) => {
  const { data } = props;

  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  /**
   * @param data Data to be processed
   * @returns If data is empty, return an null.Or after processing, return a root node.
   */
  const getRootNode = (data: DataType[]): Node | null => {
    return (
      (data.length && {
        id: "1",
        position: { x: 0, y: 0 },
        data: data[0],
      }) ||
      null
    );
  };

  const bfs = (root: Node, leaf: DataType[], tree: Node[], branch: Edge[]) => {
    return {
      currentNode: tree,
      currentEdge: branch,
    };
  };

  const transform = useCallback((data: DataType[]) => {
    const root = getRootNode(data);

    /**
     * @description Each tree needs its own root.If root is not exist, will throw an error.
     */
    if (!root) {
      throw new Error("Can not find root node");
    }

    const { currentNode, currentEdge } = bfs(root, data, [], []);

    setNodes(currentNode);
    setEdges(currentEdge);
  }, []);

  useEffect(() => {
    transform(data);
  }, [data, transform]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
};
