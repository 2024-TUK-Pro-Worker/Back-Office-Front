import {axiosApi} from "@/client/base";

export const getBgmListApi = async () => {
  try {
    const result = await axiosApi.get("api/account/bgm");
    
    return result?.data
  } catch (e) {
    
    return;
  }
}

export const insertBgmListApi = async (formData: FormData) => {
  try {
    const result = await axiosApi.post("api/account/bgm/insert",formData);
    
    return result?.data
  } catch (e) {
    
    return;
  }
}