import "reactflow/dist/style.css";
import "./approval-flow.css";

import React, {
  ForwardedRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import ReactFlow, {
  Edge,
  EdgeProps,
  Node,
  NodeChange,
  NodePositionChange,
  NodeProps,
  useNodesState,
} from "reactflow";

import { Card } from "./components/card/card";
import { AddEdge } from "./components/edges";
import { End } from "./components/nodes/end";
import {
  ApprovalFlowRefType,
  BaseDataType,
  EdgeDataType,
  IApprovalFlowProps,
} from "./types/index.types";
import {
  bfs,
  buidlNode,
  getDagreTree,
  getRootNodes,
} from "./utils/approval-flow-util";

export const ApprovalFlow = React.forwardRef(
  <T extends BaseDataType>(
    props: IApprovalFlowProps<T>,
    ref: ForwardedRef<ApprovalFlowRefType>,
  ) => {
    const { direction, addEdgeProps, onSort, onDelete, onCopy } = props;

    const {
      renderInitiatorForm,
      renderConditionForm,
      renderApproverForm,
      renderCcRecipientForm,
      initiatorClassName,
      approverClassName,
      ccClassName,
      conditionClassName,
    } = addEdgeProps;

    const [nodes, setNodes, onNodesChange] = useNodesState<T>([]);

    const [edges, setEdges] = useState<Edge[]>([]);

    const nodeTypes = useMemo(
      () => ({
        InitiatorNode: (rest: NodeProps) => (
          <Card
            {...rest}
            targetPosition={undefined}
            className={`${initiatorClassName ?? ""}  approval-flow-initiator`}
            title="发起人"
            renderForm={renderInitiatorForm}
          />
        ),
        ApproverNode: (rest: NodeProps) => (
          <Card
            {...rest}
            className={`${approverClassName ?? ""}  approval-flow-approver`}
            title="审批人"
            displayDelete={true}
            onDelete={onDelete}
            renderForm={renderApproverForm}
          />
        ),
        CcRecipientNode: (rest: NodeProps) => (
          <Card
            {...rest}
            title="抄送人"
            className={`${ccClassName ?? ""}  approval-flow-ccRecipient`}
            displayDelete={true}
            onDelete={onDelete}
            renderForm={renderCcRecipientForm}
          />
        ),
        ConditionNode: (rest: NodeProps<T>) => (
          <Card
            {...rest}
            className={`${conditionClassName ?? ""}  approval-flow-condition`}
            title={rest.data.name || "条件"}
            displayCopy={rest.data.draggable}
            displayDelete={rest.data.draggable}
            onDelete={onDelete}
            onCopy={onCopy}
            renderForm={renderConditionForm}
          />
        ),
        End,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const edgeTypes = useMemo(
      () => ({
        AddEdge: (rest: EdgeProps) => (
          <AddEdge edge={rest} direction={direction} {...addEdgeProps} />
        ),
        ConditionEdge: (rest: EdgeProps) => (
          <AddEdge
            edge={rest}
            direction={direction}
            isCondition={true}
            {...addEdgeProps}
          />
        ),
        EndEdge: (rest: EdgeProps) => (
          <AddEdge
            edge={rest}
            direction={direction}
            isEnd={true}
            {...addEdgeProps}
          />
        ),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

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
          ((data.length && [buidlNode("1", 0, 1, data[0], false)]) || []);

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

          const endNode = buidlNode(
            "end",
            0,
            currentRank + 1,
            {
              id: "end",
              parentId: "",
              label: "end",
              type: "End",
            },
            false,
          );

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

    useMemo(() => {
      transform(props);
    }, [props, transform]);

    const handlePositionChange = (changes: NodeChange[]) => {
      const result = changes.map((item) => {
        const data = item as NodePositionChange;

        const currentNode = nodes.find((value) => value.id === data.id);

        if (!currentNode || data.type !== "position") return item;

        const isHorizontal = direction === "TB";

        // 找出限制范围
        const children = nodes
          .filter((item) => item.data.parentId === currentNode.data.parentId)
          .map((item) => (isHorizontal ? item.position.x : item.position.y));

        const min = Math.min(...children) + 50;

        const max =
          Math.max(...children) -
          (isHorizontal ? props.nodeWidth : props.nodeHeight);

        currentNode.position = isHorizontal
          ? {
              x:
                (data.position?.x &&
                  data.position.x >= min &&
                  data.position.x < max &&
                  data.position.x) ||
                currentNode?.position.x,
              y: currentNode?.position.y,
            }
          : {
              x: currentNode?.position.x,
              y:
                (data.position?.y &&
                  data.position.y >= min &&
                  data.position.y < max &&
                  data.position.y) ||
                currentNode?.position.y,
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

      const flag = nodes.some(
        (value) =>
          !!result[value.data.id] &&
          value.data.sortNumber !== result[value.data.id],
      );

      (flag && onSort && onSort(result)) ||
        setNodes(
          nodes.map((item) => ({
            ...item,
            position: item.data.position ?? item.position,
          })),
        );
    };

    // 切换各条流程线状态
    const updateEdges = (node: Node<T>[]) => {
      const matchPath = (path: string, fullPath: string) => {
        const regex = new RegExp(`^${path.split("-").join("-?")}`);

        return regex.test(fullPath);
      };

      const getStatus = (source?: Node<T>) =>
        source &&
        node.some(
          (item) =>
            matchPath(source.id, item.id) || matchPath(item.id, source.id),
        )
          ? "error"
          : undefined;

      const current: Edge<EdgeDataType>[] = edges.map((item) => ({
        ...item,
        data: {
          ...item.data,
          status: getStatus(item.data?.source),
        },
      }));

      setEdges(current);
    };

    // todo: 优化
    const verify = () => {
      let flag = false;

      // 找到错有错误节点
      const errorNode: Node<T>[] = [];

      // 汇总所有错误信息
      const message = [];

      // 获取条件分支
      const conditionRoot: Node<T>[] = edges
        .filter((item) => item.type === "ConditionEdge")
        .map((item) => item.data.target);

      // 当不存在条件分支时，直接校验全流程是否存在审批节点
      if (
        !conditionRoot.length &&
        nodes.every((item) => item.type !== "ApproverNode")
      ) {
        flag = true;
        message.push("流程中至少需要一个审批节点");
      }

      // 若存在条件分支，续判断各条件分支是否存在审批节点
      if (conditionRoot.length) {
        const dfs = (current: Node<T>): boolean => {
          if (current.type === "ApproverNode") return true;

          return nodes
            .filter((item) => item.data.parentId === current.data.id)
            .some((item) => dfs(item));
        };

        const conditionBranch = conditionRoot.filter((item) => !dfs(item));

        // 获取到有问题的分支
        errorNode.push(...conditionBranch);
        message.push(
          `${conditionBranch.map((item) => item.data.name)}条件分支流程至少需要一个审批节点`,
        );
      }

      // 校验结点详情表单未设置
      const settingEmptyNodes = nodes.filter(
        (item) => item.type !== "End" && !item.data.setting,
      );

      // 节点状态切换
      if (settingEmptyNodes.length) {
        flag = true;
        errorNode.push(...settingEmptyNodes);
        setNodes(
          nodes.map((item) => ({
            ...item,
            data: {
              ...item.data,
              ...(item.type !== "End" &&
                !item.data.setting && { status: "error", message: "待设置" }),
            },
          })),
        );
        message.push(
          `${settingEmptyNodes.map((item) => item.data.name)} 待设置`,
        );
      } else {
        setNodes(
          nodes.map((item) => ({
            ...item,
            data: { ...item.data, status: null, message: null },
          })),
        );
      }

      updateEdges(errorNode);

      return {
        status: flag ? "ok" : "error",
        message,
      };
    };

    useImperativeHandle(ref, () => ({
      verify,
    }));

    return (
      <ReactFlow
        style={{ background: "#fff" }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={handlePositionChange}
        onNodeDragStop={handleDragStop}
        fitView
      />
    );
  },
);
