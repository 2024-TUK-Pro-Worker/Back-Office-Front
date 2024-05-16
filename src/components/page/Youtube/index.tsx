import {getVideoList} from "@/client/video";
import {useCallback, useEffect, useState} from "react";
import {Alert, Select, Skeleton} from "antd";
import styled from "styled-components";
import ShortsLogo from 'public/img/logo/Youtube_shorts_icon.svg'
import Image from "next/image";
import DefaultModal from "@/components/shared/ui/default-modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectUploadVideo, setSelectUploadVideo] = useState<number | undefined>(undefined);
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
      const notUploadList = response.data.filter(({uploadId, isDeleted}: {
        uploadId: string,
        isDeleted: string
      }) => !uploadId && isDeleted !== 'Y').map((video: any) => {
        return {
          value: video.id,
          label: `${video.gptTitle} (${video.title || '제목 없음'})`,
          disabled: !video.title || !video.content,
        }
      });
      setNotUploadVideoList(notUploadList)
      setIsLoading(false)
    } catch (e) {
      errorHandle(e)
      setIsLoading(false)
    }

  }

  const UploadVideoComponent = useCallback(() => {
    return (<video controls>
      <source src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/video/preview/${selectUploadVideo}`}
              type={'video/mp4'}/>
    </video>)
  }, [selectUploadVideo])

  useEffect(() => {
    getVideoListData()
  }, []);
  useEffect(() => {
    console.log(uploadVideoList)
  }, [uploadVideoList]);

  return (
    <>
      <DefaultModal
        handleHide={() => {
          setIsModalOpen(false)
        }}
        title={`영상 업로드`}
        open={isModalOpen}
        confirmLoading={updateLoading}
        onOk={() => {
          setUpdateLoading(false)
        }}>
        <Select options={notUploadVideoList} className={'w-full'} onSelect={(data) => {
          setSelectUploadVideo(data);
        }}/>
        {selectUploadVideo && (<UploadVideoComponent/>)}
      </DefaultModal>
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
            <Image src={ShortsLogo} alt={'shorts'} width={68} onClick={() =>
              setIsModalOpen(true)
            }/>
          </UploadIcon>
        </UploadYoutubeWrapper>
        {isLoading ?
          <Skeleton.Image active={true} style={{width: '315px', height: '560px'}}/> : uploadVideoList.map(({uploadId}: {
            uploadId: string
          }) => {
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