import {axiosApi} from "@/client/base";

export const uploadYoutube = async (data: { videoId: number; }) => {
  try {
    const result = await axiosApi.post("api/youtube/upload", data);
    console.log(result.data)
    return result.data
  } catch (e) {
    throw new Error('서버가 원활하지 않습니다. 잠시 후 다시 시도 해주세요.');
  }
}