import {getVideoList} from "@/client/video";
import {useEffect, useState} from "react";
import {Alert} from "antd";

export const YoutubeUpload = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadVideoList, setUploadVideoList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)

  const errorHandle = (e: any) => {
    setErrorMessage(e?.message || '알수 없는 에러');
    setIsError(true)
  }
  const getVideoListData = async () => {
    try {
      setIsLoading(true)
      const response = await getVideoList();
      const uploadList = response.data.filter(({uploadId, isDeleted}: {
        uploadId: string,
        isDeleted: string
      }) => !!uploadId && isDeleted !== 'Y');
      setUploadVideoList(uploadList);
      setIsLoading(false)
    } catch (e) {
      errorHandle(e)
      setIsLoading(false)
    }

  }

  useEffect(() => {
    getVideoListData()
  }, []);
  useEffect(() => {
    console.log(uploadVideoList)
  }, [uploadVideoList]);

  return (
    <>
      {isError && <Alert
        className={'mb-5'}
        message={errorMessage}
        type={'error'}
        afterClose={() => {
          setIsError(false)
          setErrorMessage('')
        }}
        closable
      />}
      <div className={'flex w-full gap-5'}>
        {uploadVideoList.map(({uploadId}: { uploadId: string }) => {
          return (
            <iframe
              key={uploadId}
              className={'rounded-md'}
              width="315"
              height="560"
              src={`https://www.youtube.com/embed/${uploadId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;
gyroscope; picture-in-picture;
web-share"
              allowFullScreen
            />
          )
        })}
      </div>
    </>
  )

}