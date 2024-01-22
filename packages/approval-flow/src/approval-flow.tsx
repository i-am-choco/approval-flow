import "reactflow/dist/style.css";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { Edge, Node, NodeProps } from "reactflow";

import { Approver } from "./components/nodes/approver";
import { CarbonCopy } from "./components/nodes/carbon-copy";
import { Condition } from "./components/nodes/condition";
import { End } from "./components/nodes/end";
import { Sponsor } from "./components/nodes/sponsor";
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
  const {
    data,
    direction,
    roots,
    sponsorProps,
    approverProps,
    carbonCopyProps,
    conditionProps,
  } = props;

  const [nodes, setNodes] = useState<Node[]>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  // discussion： 我认为其实这里可以全部都自定义，然后抛出增删改方法即可
  const NodeTypes = {
    Sponsor: (rest: NodeProps<T>) => <Sponsor {...rest} {...sponsorProps} />,
    Approver: (rest: NodeProps<T>) => <Approver {...rest} {...approverProps} />,
    CarbonCopy: (rest: NodeProps<T>) => (
      <CarbonCopy {...rest} {...carbonCopyProps} />
    ),
    Condition: (rest: NodeProps<T>) => (
      <Condition {...rest} {...conditionProps} />
    ),
    End,
  };

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
        type: "End",
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

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={NodeTypes} fitView />
  );
};
