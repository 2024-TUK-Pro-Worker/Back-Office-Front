import { getVideoList } from "@/client/video";
import { useEffect } from "react";

export const VideoList = () => {
  const result = getVideoList();
  useEffect(() => {
    console.log(result);
  }, [result]);
  return (
    <>

    </>
  )
}