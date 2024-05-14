import { getVideoList } from "@/client/video";
import { useEffect } from "react";

export const VideoList = () => {
  const getVideoListData = async () => {
    const a  = await getVideoList();
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