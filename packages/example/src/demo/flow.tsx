import { Button, Layout } from "antd";
import { ApprovalFlow } from "approval-flow";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NodesType } from "../api/api.types";
import { getFlowsDetail } from "../api/flows";
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

  useEffect(() => {
    id && getDetail();
  }, [getDetail, id]);

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
            addEdgeCards={[]}
            sponsorProps={{ render: () => <span>nod</span> }}
          />
        )}
      </Content>
    </Layout>
  );
};
