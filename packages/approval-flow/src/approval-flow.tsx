import "reactflow/dist/style.css";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Edge,
  EdgeProps,
  Node,
  NodeChange,
  NodePositionChange,
  NodeProps,
  NodeTypes,
  useNodesState,
} from "reactflow";

import { Card } from "./components/card/card";
import { AddEdge } from "./components/edges";
import { EndEdge } from "./components/edges/end-edge/end-edge";
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
  const { direction, addEdgeCards, onSort } = props;

  const [nodes, setNodes, onNodesChange] = useNodesState<T>([]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const nodeTypes = {
    InitiatorNode: (rest: NodeProps) => (
      <Card
        {...rest}
        targetPosition={undefined}
        titleStyles={{ background: "rgb(158, 170, 242)" }}
        title="发起人"
      />
    ),
    ApproverNode: (rest: NodeProps) => (
      <Card
        {...rest}
        titleStyles={{ background: "rgb(254, 188, 110)" }}
        title="审批人"
      />
    ),
    CcRecipientNode: (rest: NodeProps) => (
      <Card
        {...rest}
        titleStyles={{ background: "rgb(248, 145, 138)" }}
        title="抄送人"
      />
    ),
    Condition: (rest: NodeProps) => (
      <Card
        {...rest}
        titleStyles={{ background: "rgb(172, 226, 155)" }}
        title="条件"
      />
    ),
    End,
  };

  const [types] = useState<NodeTypes>(nodeTypes);

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
    EndEdge,
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
    [setNodes],
  );

  useEffect(() => {
    transform(props);
  }, [props, transform]);

  const handlePositionChange = (changes: NodeChange[]) => {
    const result = changes.map((item) => {
      const data = item as NodePositionChange;

      const currentNode = nodes.find((value) => value.id === data.id);

      if (!currentNode || data.type !== "position") return item;

      const isHorizontal = direction === "TB";

      currentNode.position = isHorizontal
        ? {
            x: data.position?.x ?? currentNode?.position.x,
            y: currentNode?.position.y,
          }
        : {
            x: currentNode?.position.x,
            y: data.position?.y ?? currentNode?.position.y,
          };

      return currentNode;
    });

    onNodesChange(result as NodeChange[]);
  };

  const handleDragStop = (
    e: React.MouseEvent<Element, MouseEvent>,
    node: Node<T>,
  ) => {
    const result: Record<string, number> = {};

    nodes
      .filter((item) => item.data.parentId === node.data.parentId)
      .sort((a, b) =>
        direction === "TB"
          ? a.position.x - b.position.x
          : a.position.y - b.position.y,
      )
      .map((item, index) => {
        result[item.data.id] = index + 1;
      });

    onSort && onSort(result);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={types}
      edgeTypes={edgeTypes}
      onNodesChange={handlePositionChange}
      onNodeDragStop={handleDragStop}
      fitView
    />
  );
};
