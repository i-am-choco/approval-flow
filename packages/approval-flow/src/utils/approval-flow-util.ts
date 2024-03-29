import dagre from "dagre";
import { Edge, MarkerType, Node, Position } from "reactflow";

import { BaseDataType, EdgeDataType } from "../types/index.types";

export const buidlNode = <T extends BaseDataType>(
  id: string,
  positionX: number,
  positionY: number,
  data: T,
  draggable: boolean,
): Node => ({
  id,
  position: { x: positionX, y: positionY },
  data: { ...data, draggable },
  type: data.type,
  draggable,
  zIndex: 100,
});

export const buidlEdge = (
  id: string,
  source: string,
  target: string,
  type?: string,
  data?: EdgeDataType,
): Edge => ({
  id,
  source,
  target,
  type,
  data,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
  style: {
    stroke: "#BBB9CF",
  },
});

export const getRootNodes = <T extends BaseDataType>(roots: T[]): Node[] => {
  return roots.map((item, index) =>
    buidlNode((index + 1).toString(), 0, 0, item, false),
  );
};

export const bfs = <T extends BaseDataType>(
  root: Node,
  leaf: Array<T>,
  rank: number,
) => {
  const children = leaf
    .filter((item) => item.parentId === root.data.id)
    ?.sort((a, b) => (a?.sortNumber || 0) - (b?.sortNumber || 0));

  const tree: Node[] = [];

  const branch: Edge[] = [];

  if (!children.length) {
    branch.push(
      buidlEdge(`s${root.id}tend`, root.id, "end", "EndEdge", {
        source: root,
      }),
    );
  }

  const rankList: number[] = children
    .sort(
      (a, b) =>
        (a?.sortNumber && b?.sortNumber && a.sortNumber - b?.sortNumber) || 0,
    )
    .map((item, index) => {
      const currentRoot = buidlNode(
        `${root.id}-${index + 1}`,
        0,
        rank + 1,
        item,
        item.type === "ConditionNode" && index !== children.length - 1,
      );

      const currentBranch = buidlEdge(
        `s${root.id}t${currentRoot.id}`,
        root.id,
        currentRoot.id,
        currentRoot.data.type === "ConditionNode" ? "ConditionEdge" : "AddEdge",
        {
          source: root,
          target: currentRoot,
        },
      );

      const { currentNode, currentEdge, currentRank } = bfs(
        currentRoot,
        leaf,
        rank + 1,
      );

      tree.push(currentRoot, ...currentNode);
      branch.push(currentBranch, ...currentEdge);

      return currentRank;
    });

  return {
    currentNode: tree,
    currentEdge: branch,
    currentRank: Math.max(...rankList, rank),
  };
};
export const getDagreTree = (
  nodes: Node[],
  edges: Edge[],
  nodeWidth: number,
  nodeHeight: number,
  rankdir: "TB" | "LR",
): [Node[], Edge[]] => {
  const dagreGraph = new dagre.graphlib.Graph();

  const isHorizontal = rankdir === "LR";

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir,
    nodesep: 100,
    ranksep: 100,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
      rank: node.position.y,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    const root = dagreGraph.node("1");

    const parent = nodes.find((item) => item.data.id === node.data.parentId);

    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    const getRankDistance = (type?: string) => {
      switch (type) {
        case "InitiatorNode":
          return 100;
        case "ConditionNode":
          return 130;
        case "ApproverNode":
          return 130;
        case "CcRecipientNode":
          return 120;
        default:
          return 150;
      }
    };

    node.position.x = isHorizontal
      ? root.x +
        (node.position.y - 1) * (getRankDistance(parent?.type) + nodeWidth)
      : (node.id === "end" ? root.x : nodeWithPosition.x) - nodeWidth / 2;
    node.position.y = isHorizontal
      ? (node.id === "end" ? root.y : nodeWithPosition.y) - nodeHeight / 2
      : root.y +
        (node.position.y - 1) * (getRankDistance(parent?.type) + nodeHeight);

    node.data.position = node.position;
  });

  return [nodes, edges];
};
