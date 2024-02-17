/* eslint-disable camelcase */
import { Button, Layout, Modal } from "antd";
import { ApprovalFlow } from "approval-flow";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { NodesType } from "../api/api.types";
import {
  copyApi,
  deleteApi,
  getFlowsDetail,
  saveApi,
  sortApi,
} from "../api/flows";
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
        priority: 1,
        query: {
          combinator: "and",
          rules: [
            {
              field: "units",
              operator: "in",
              value: "{% mock 'guid' %},{% mock 'guid' %}",
            },
            {
              field: "groups",
              operator: "in",
              value: "{% mock 'guid' %},{% mock 'guid' %}",
            },
          ],
        },
      },
      created_by: new Date().toLocaleDateString(),
    });

    if (response === "success") {
      getDetail();
    }
  };

  const handleCondition = async (parentId: string) => {
    if (!id) return;
    const response = await saveApi(id, {
      parent_id: parentId,
      name: "条件1",
      description: "其他条件进入此流程",
      icon: null,
      type: "ConditionNode",
      handler: null,
      expression_init: null,
      setting: {
        priority: 1,
        query: {},
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

  const handleSort = async (value: Record<string, number>) => {
    if (!id) return;
    await sortApi(id, value);

    await getDetail();
  };

  const handleDelete = async (nodeId: string) => {
    if (!id) return;

    await deleteApi(id, nodeId);

    await getDetail();
  };

  const handleCopy = async (nodeId: string) => {
    if (!id) return;
    await copyApi(id, nodeId);
    await getDetail();
  };

  const approvalRef = useRef<any>(null);

  const handleSave = () => {
    const res = approvalRef.current?.verify();

    console.log(res?.message);
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

        <Button onClick={handleSave}>save</Button>
      </Header>
      <Content style={{ height: "800px" }}>
        {!!nodes.length && (
          <ApprovalFlow
            ref={approvalRef}
            nodeHeight={70}
            nodeWidth={260}
            data={nodes}
            direction={direction}
            addEdgeProps={{
              renderApproverForm: (edge, open, onClose) => {
                return (
                  <Modal
                    open={open}
                    onCancel={() => {
                      onClose && onClose();
                    }}
                    onOk={() => {
                      edge.data?.source &&
                        handlAdd("ApproverNode", edge.data.source.data.id);
                      onClose && onClose();
                    }}
                  />
                );
              },
              renderCcRecipientForm: (edge, open, onClose) => {
                return (
                  <Modal
                    open={open}
                    onCancel={() => {
                      onClose && onClose();
                    }}
                    onOk={() => {
                      edge.data?.source &&
                        handlAdd("ApproverNode", edge.data.source.data.id);
                      onClose && onClose();
                    }}
                  />
                );
              },
              renderConditionForm: (edge, open, onClose) => {
                return (
                  <Modal
                    open={open}
                    onCancel={() => {
                      onClose && onClose();
                    }}
                    onOk={() => {
                      edge.data?.source &&
                        handleCondition(edge.data.source.data.id);
                      onClose && onClose();
                    }}
                  />
                );
              },
            }}
            onSort={handleSort}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />
        )}
      </Content>
    </Layout>
  );
};
