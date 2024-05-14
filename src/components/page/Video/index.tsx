import { getVideoList } from "@/client/video";
import { useEffect } from "react";

export const VideoList = () => {
  const getVideoListData = async () => {
    const a  = await getVideoList();
    console.log(a);
    return a;
  }
  useEffect(() => {
    getVideoListData()
  }, []);
  return (
    <>

    </>
  )
}