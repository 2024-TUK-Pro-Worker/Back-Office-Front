import {ISO8601DateTime} from "@/types/common";
import qs from "qs";
import useSWR from "swr";
import {axiosApi, fetchApi} from "../base";
//
// export interface IProduct {
//   id: number;
//   code: string;
//   brand: string;
//   name: string;
//   price: number;
//   status: string;
//   description?: string;
//   css?: string;
//   js?: string;
//   createdAt: ISO8601DateTime;
//   updatedAt: ISO8601DateTime;
// }
//
// export interface IProductFormValue extends Omit<IProduct, "id" | "createdAt" | "updatedAt"> {}
// interface IProductsParams {
//   page?: number;
// }
//
// export interface IProductsResponse {
//   code: number;
//   message: string;
//   data: {
//     items: IProduct[];
//     page: {
//       currentPage: number;
//       pageSize: number;
//       totalPage: number;
//       totalCount: number;
//     };
//   };
// }
//
// export interface IProductResponse {
//   code: number;
//   message: string;
//   data: IProduct;
// }
//
// export const useProducts = (params: IProductsParams = {}) => {
//   return useSWR<IProductsResponse>(`api/sample/products?${qs.stringify(params)}`);
// };
//
// export const useProduct = (id: string | number) => {
//   return useSWR<IProductResponse>(`api/sample/products/${id}`);
// };
//
// export const createProduct = (value: IProductFormValue) => {
//   return fetchApi.post(`api/sample/products`, { body: JSON.stringify(value) });
// };
//
// export const updateProduct = (id: string, value: IProductFormValue) => {
//   return fetchApi.put(`api/sample/products/${id}`, { body: JSON.stringify(value) });
// };

export const getVideoList = async () => {
  try {
    const result = await axiosApi.get("api/video/list");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};

export const putVideoDetail = async (data: { videoId: number; title: string; content: string; tags: string[] }) => {
  try {
    const result = await axiosApi.put("api/video/detail", data);
    console.log(result.data)
    return result.data
  } catch (e) {
    throw new Error('서버가 원활하지 않습니다. 잠시 후 다시 시도 해주세요.');
  }
}