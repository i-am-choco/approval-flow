import { api } from "./api";
import * as types from "./api.types";

export const getTableList = async () => {
  const response = await api.get("/api/flows");

  return response.data.data;
};

const transform = (value: types.DetailResponseType): types.DetailType => ({
  ...value,
  createdAt: value.created_at,
  createdBy: value.created_by,
  updatedAt: value.updated_at,
  updatedBy: value.updated_by,
  nodes: value.nodes.map((item) => ({
    ...item,
    parentId: item.parent_id,
    expressionInit: item.expression_init,
  })),
});

export const getFlowsDetail = async (id: string): Promise<types.DetailType> => {
  const response = await api.get(`/api/flows/${id}`);

  return transform(response.data.data);
};

export const saveApi = async (id: string, params: any) => {
  const response = await api.post(`/api/flows/${id}/nodes`, params);

  return response.data.message;
};
