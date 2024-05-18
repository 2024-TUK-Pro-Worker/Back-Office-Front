import {axiosApi} from "@/client/base";

export const getBgmListApi = async () => {
  try {
    const result = await axiosApi.get("api/account/bgm");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
}

export const insertBgmListApi = async (formData: FormData) => {
  try {
    const result = await axiosApi.post("api/account/bgm/insert",formData);
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
}