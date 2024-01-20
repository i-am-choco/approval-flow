import "reactflow/dist/style.css";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { Edge, Node } from "reactflow";

import { BaseDataType, IApprovalFlowProps } from "../types/approval-flow.types";
import {
  bfs,
  buidlNode,
  getDagreTree,
  getRootNodes,
} from "../utils/approval-flow-util";

export const ApprovalFlow = <T extends BaseDataType>(
  props: IApprovalFlowProps<T>,
) => {
  const { data, direction, roots } = props;

  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const transform = useCallback(
    (data: T[], direction: "TB" | "LR", roots?: T[]) => {
      const root: Node[] =
        (roots && getRootNodes(roots)) ??
        ((data.length && [buidlNode("1", 0, 0, data[0])]) || []);

      /**
       * @description Each tree needs its own root.If root is not exist, will throw an error.
       */
      if (!root.length) {
        throw new Error("Can not find root node");
      }

      const endNode = buidlNode("end", 0, 0, {
        id: "end",
        parentId: "",
        label: "end",
      });

      const tree: Node[] = [endNode];

      const branch: Edge[] = [];

      root.map((root: Node) => {
        const { currentNode, currentEdge } = bfs(root, data);

        tree.push(root, ...currentNode);
        branch.push(...currentEdge);
      });

      const [dagreNodes, dagreEdges] = getDagreTree(
        tree,
        branch,
        260,
        70,
        direction,
      );

      setNodes(dagreNodes);
      setEdges(dagreEdges);
    },
    [],
  );

  useEffect(() => {
    transform(data, direction, roots);
  }, [data, direction, roots, transform]);

  return <ReactFlow nodes={nodes} edges={edges} fitView />;
};
