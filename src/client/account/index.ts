import {axiosApi} from "../base";
export const getScheduler = async () => {
  try {
    const result = await axiosApi.get("api/video/list");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};