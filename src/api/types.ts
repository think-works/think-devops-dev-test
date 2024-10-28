import { types } from "@think/components";

export type ApiResponse<Data = any, Ext = any> = types.ApiResponse<Data, Ext>;
export type PagingRequest = types.PagingRequest;
export type PagingResponse<T = any> = types.PagingResponse<T>;
