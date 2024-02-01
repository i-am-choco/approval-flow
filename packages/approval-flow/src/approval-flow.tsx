import "reactflow/dist/style.css";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { Edge, EdgeProps, Node } from "reactflow";

import { AddEdge } from "./components/edges";
import { End } from "./components/nodes/end";
import { BaseDataType, IApprovalFlowProps } from "./types/index.types";
import {
  bfs,
  buidlNode,
  getDagreTree,
  getRootNodes,
} from "./utils/approval-flow-util";

export const ApprovalFlow = <T extends BaseDataType>(
  props: IApprovalFlowProps<T>,
) => {
  const { direction, addEdgeCards, nodeTypes } = props;

  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const edgeTypes = {
    AddEdge: (rest: EdgeProps) => (
      <AddEdge edge={rest} direction={direction} cards={addEdgeCards} />
    ),
    ConditionEdge: (rest: EdgeProps) => (
      <AddEdge
        edge={rest}
        direction={direction}
        cards={addEdgeCards}
        isCondition={true}
      />
    ),
  };

  const transform = useCallback(
    (params: {
      data: T[];
      direction: "TB" | "LR";
      nodeWidth: number;
      nodeHeight: number;
      roots?: T[];
    }) => {
      const { data, direction, nodeWidth, nodeHeight, roots } = params;

      const root: Node[] =
        (roots && getRootNodes(roots)) ??
        ((data.length && [buidlNode("1", 0, 1, data[0])]) || []);

      /**
       * @description Each tree needs its own root.If root is not exist, will throw an error.
       */
      if (!root.length) {
        throw new Error("Can not find root node");
      }

      const tree: Node[] = [];

      const branch: Edge[] = [];

      root.map((root: Node) => {
        const { currentNode, currentEdge, currentRank } = bfs(root, data, 1);

        const endNode = buidlNode("end", 0, currentRank + 1, {
          id: "end",
          parentId: "",
          label: "end",
          type: "End",
        });

        tree.push(root, ...currentNode, endNode);
        branch.push(...currentEdge);
      });

      const [dagreNodes, dagreEdges] = getDagreTree(
        tree,
        branch,
        nodeWidth,
        nodeHeight,
        direction,
      );

      setNodes(dagreNodes);
      setEdges(dagreEdges);
    },
    [],
  );

  useEffect(() => {
    transform(props);
  }, [props, transform]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={{ ...nodeTypes, End }}
      edgeTypes={edgeTypes}
      fitView
    />
  );
};
