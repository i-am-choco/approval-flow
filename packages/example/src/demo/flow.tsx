/* eslint-disable camelcase */
import { Button, Layout, Modal } from "antd";
import {
  AddEdgeOptionsType,
  ApprovalFlow,
  Card,
  NodeProps,
} from "approval-flow";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NodesType } from "../api/api.types";
import { getFlowsDetail, saveApi, sortApi } from "../api/flows";
const { Header, Content } = Layout;

export const Flow = () => {
  const [direction, setDirection] = useState<"TB" | "LR">("TB");

  const [nodes, setNodes] = useState<NodesType[]>([]);

  const { id } = useParams();

  const getDetail = useCallback(async () => {
    if (!id) return;
    const result = await getFlowsDetail(id);

    setNodes(result.nodes || []);
  }, [id]);

  const handlAdd = async (type: string, parentId: string) => {
    if (!id) return;

    const response = await saveApi(id, {
      parent_id: parentId,
      name: "审批人",
      description: "上级审批：直属上级",
      icon: null,
      type,
      handler: null,
      expression_init: null,
      setting: {
        approver_type: 2,
        superior_level: 1,
        approval_type: 1,
      },
      created_by: new Date().toLocaleDateString(),
    });

    if (response === "success") {
      getDetail();
    }
  };

  useEffect(() => {
    id && getDetail();
  }, [getDetail, id]);

  const nodeTypes = {
    InitiatorNode: (rest: NodeProps) => (
      <Card {...rest} targetPosition={undefined} title="发起人" />
    ),
    ApproverNode: (rest: NodeProps) => <Card {...rest} title="审批人" />,
    CcRecipientNode: (rest: NodeProps) => <Card {...rest} title="抄送人" />,
    Condition: (rest: NodeProps) => <Card {...rest} title="条件" />,
  };

  const addEdgeCards: AddEdgeOptionsType[] = [
    {
      type: "ApproverNode",
      title: "审批人",
      renderForm: (type, edge, open, onClose) => {
        return (
          <Modal
            open={open}
            onCancel={() => {
              onClose && onClose();
            }}
            onOk={() => {
              edge.data?.source && handlAdd(type, edge.data.source.data.id);
            }}
          />
        );
      },
    },
  ];

  const handleSort = async (value: Record<string, number>) => {
    if (!id) return;
    await sortApi(id, value);

    await getDetail();
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button onClick={() => setDirection("TB")}>TB</Button>
        <Button onClick={() => setDirection("LR")}>LR</Button>
      </Header>
      <Content style={{ height: "800px" }}>
        {!!nodes.length && (
          <ApprovalFlow
            nodeHeight={70}
            nodeWidth={260}
            data={nodes}
            direction={direction}
            addEdgeCards={addEdgeCards}
            nodeTypes={nodeTypes}
            onSort={handleSort}
          />
        )}
      </Content>
    </Layout>
  );
};
