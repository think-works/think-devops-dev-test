import { types } from "@think/components";
import http from "../index";
import { ApiResponse, PagingRequest, PagingResponse } from "../types";

export type ExampleModel = {
  id?: number | string;
  name?: string;
  level?: number;
  date?: number;
  elapsed?: number;
  count?: number;
  desc?: string;
};

export const queryExample = (
  params: types.RequiredKey<Pick<ExampleModel, "id">>,
): Promise<ApiResponse<ExampleModel>> => http.get("/example/query", { params });

export const pagingExample = (
  params: PagingRequest & {
    keyword?: string;
    levels?: string[];
    startDate?: number;
    endDate?: number;
  },
): Promise<ApiResponse<PagingResponse<ExampleModel>>> =>
  http.post("/example/paging", params);

export const createExample = (params: ExampleModel): Promise<ApiResponse> =>
  http.post("/example/create", params);

export const updateExample = (
  params: types.RequiredKey<Pick<ExampleModel, "id">>,
): Promise<ApiResponse> => http.post("/example/update", params);

export const deleteExample = (
  params: types.RequiredKey<Pick<ExampleModel, "id">>,
): Promise<ApiResponse> => http.post("/example/delete", params);
