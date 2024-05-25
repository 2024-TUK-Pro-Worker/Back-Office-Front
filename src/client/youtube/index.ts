import {axiosApi} from "@/client/base";

export const uploadYoutube = async (data: { videoId: number; }) => {
  try {
    const result = await axiosApi.post("api/youtube/upload", data);
    return result.data
  } catch (e) {
    throw new Error('서버가 원활하지 않습니다. 잠시 후 다시 시도 해주세요.');
  }
}
export const deleteYoutube = async (data: { videoId: number; }) => {
  try {
    const result = await axiosApi.delete("api/youtube/delete", { data });
    return result.data
  } catch (e) {
    throw new Error('서버가 원활하지 않습니다. 잠시 후 다시 시도 해주세요.');
  }
}