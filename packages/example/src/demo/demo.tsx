import { Button, Layout } from "antd";
import { ApprovalFlow } from "approval-flow";
import React, { useState } from "react";
const { Header, Content } = Layout;

export const Demo = () => {
  const [direction, setDirection] = useState<"TB" | "LR">("TB");

  const [data] = useState([]);

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
      <Content>
        {!!data.length && (
          <ApprovalFlow
            nodeHeight={70}
            nodeWidth={260}
            data={data}
            direction={direction}
            addEdgeCards={[]}
            sponsorProps={{ render: () => <span>nod</span> }}
          />
        )}
      </Content>
    </Layout>
  );
};
