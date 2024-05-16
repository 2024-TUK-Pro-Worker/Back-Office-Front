import {ISO8601DateTime} from "@/types/common";
import qs from "qs";
import useSWR from "swr";
import {axiosApi, fetchApi} from "../base";
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