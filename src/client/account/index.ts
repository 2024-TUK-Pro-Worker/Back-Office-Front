import {axiosApi} from "../base";
export const getScheduler = async () => {
  try {
    const result = await axiosApi.get("api/account/scheduler/schedule");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};

export const getSchedulerStatus = async () => {
  try {
    const result = await axiosApi.get("api/account/scheduler/status");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};

export const getSchedulerStart = async () => {
  try {
    const result = await axiosApi.post("api/account/scheduler/create");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};

export const getSchedulerUpdate = async (data: {schedule: string}) => {
  try {
    const result = await axiosApi.patch("api/account/scheduler/schedule/update",data);
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};

export const getSchedulerDelete = async () => {
  try {
    const result = await axiosApi.delete("api/account/scheduler/delete");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
};

export const getPrompt = async () => {
  try {
    const result = await axiosApi.get("api/account/prompt");
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
}
export const patchPrompt = async (data:{content: string}) => {
  try {
    const result = await axiosApi.patch("api/account/prompt/update",data);
    console.log(result?.data)
    return result?.data
  } catch (e) {
    console.log(e)
    return;
  }
}