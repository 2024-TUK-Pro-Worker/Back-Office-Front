import {getVideoList} from "@/client/video";
import {useEffect, useState} from "react";
import {Alert, Skeleton} from "antd";
import styled from "styled-components";
import {Plus} from "lucide-react";
import ShortsLogo from 'public/img/logo/Youtube_shorts_icon.svg'
import Image from "next/image";

const UploadYoutubeWrapper = styled.div`
  width: 315px;
  height: 560px;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;
  cursor: pointer;
  position: relative;
`
const UploadTitle = styled.div`
  color: rgba(0, 0, 0, 0.88);
`

const UploadIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 16px;
`

export const YoutubeUpload = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadVideoList, setUploadVideoList] = useState<any[]>([]);
  const [notUploadVideoList, setNotUploadVideoList] = useState<any[]>([])
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
        <UploadYoutubeWrapper className={'rounded-md'}>
          <UploadTitle className={'m-3'}>영상 업로드</UploadTitle>
          <UploadIcon>
            <Image src={ShortsLogo} alt={'shorts'} width={68}/>
          </UploadIcon>
        </UploadYoutubeWrapper>
        {isLoading ? <Skeleton.Image active={true} style={{width: '315px', height:'560px'}}/> : uploadVideoList.map(({uploadId}: { uploadId: string }) => {
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