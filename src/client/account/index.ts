import {axiosApi} from "../base";
export const getScheduler = async () => {
  try {
    const result = await axiosApi.get("api/account/scheduler/schedule");
    return result?.data
  } catch (e) {
    return;
  }
};

export const getSchedulerStatus = async () => {
  try {
    const result = await axiosApi.get("api/account/scheduler/status");
    return result?.data
  } catch (e) {
    return;
  }
};

export const getSchedulerStart = async () => {
  try {
    const result = await axiosApi.post("api/account/scheduler/create");
    return result?.data
  } catch (e) {
    return;
  }
};

export const getSchedulerUpdate = async (data: {schedule: string}) => {
  try {
    const result = await axiosApi.patch("api/account/scheduler/schedule/update",data);
    return result?.data
  } catch (e) {
    return;
  }
};

export const getSchedulerDelete = async () => {
  try {
    const result = await axiosApi.delete("api/account/scheduler/delete");
    return result?.data
  } catch (e) {
    return;
  }
};

export const getPrompt = async () => {
  try {
    const result = await axiosApi.get("api/account/prompt");
    return result?.data
  } catch (e) {
    return;
  }
}
export const patchPrompt = async (data:{content: string}) => {
  try {
    const result = await axiosApi.patch("api/account/prompt/update",data);
    
    return result?.data
  } catch (e) {
    
    return;
  }
}