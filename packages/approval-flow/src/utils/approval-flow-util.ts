import dagre from "dagre";
import { Edge, MarkerType, Node, Position } from "reactflow";

import { BaseDataType } from "../types/index.types";

export const buidlNode = <T extends BaseDataType>(
  id: string,
  positionX: number,
  positionY: number,
  data: T,
): Node => ({
  id,
  position: { x: positionX, y: positionY },
  data,
  type: data.type,
  draggable: true,
  zIndex: 100,
});

export const buidlEdge = (
  id: string,
  source: string,
  target: string,
  type?: string,
  data?: { source: Node; target?: Node },
): Edge => ({
  id,
  source,
  target,
  type,
  data,
  markerEnd: { type: MarkerType.ArrowClosed },
});

export const getRootNodes = <T extends BaseDataType>(roots: T[]): Node[] => {
  return roots.map((item, index) =>
    buidlNode((index + 1).toString(), 0, 0, item),
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

  const rankList: number[] = children.map((item, index) => {
    const currentRoot = buidlNode(`${root.id}-${index + 1}`, 0, rank + 1, item);

    const currentBranch = buidlEdge(
      `s${root.id}t${currentRoot.id}`,
      root.id,
      currentRoot.id,
      currentRoot.data.type === "Condition" ? "ConditionEdge" : "AddEdge",
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

    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position.x = isHorizontal
      ? root.x + (node.position.y - 1) * (100 + nodeWidth)
      : (node.id === "end" ? root.x : nodeWithPosition.x) - nodeWidth / 2;
    node.position.y = isHorizontal
      ? (node.id === "end" ? root.y : nodeWithPosition.y) - nodeHeight / 2
      : root.y + (node.position.y - 1) * (100 + nodeHeight);

    return node;
  });

  return [nodes, edges];
};
