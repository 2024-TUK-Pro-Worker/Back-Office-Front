import axiosApi from "@/client/base";
export const getVideoList = async () => {
  try {
    const result = await axiosApi.get("api/video/list");
    return result?.data
  } catch (e) {
    return;
  }
};

export const putVideoDetail = async (data: { videoId: number; title: string; content: string; tags: string[] }) => {
  try {
    const result = await axiosApi.put("api/video/detail", data);
    return result.data
  } catch (e) {
    throw new Error('서버가 원활하지 않습니다. 잠시 후 다시 시도 해주세요.');
  }
}

export const setVideoBgm = async (data:{videoId: number; bgmFileName:string}) => {
  try {
    const result = await axiosApi.patch("api/video/bgm/set", data);
    return result.data
  } catch (e) {
    throw new Error('서버가 원활하지 않습니다. 잠시 후 다시 시도 해주세요.');
  }
}