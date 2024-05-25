import {getVideoList} from "@/client/video";
import {useCallback, useEffect, useState} from "react";
import {Alert, Badge, Button, notification, Select, Skeleton} from "antd";
import styled from "styled-components";
import ShortsLogo from 'public/img/logo/Youtube_shorts_icon.svg'
import Image from "next/image";
import DefaultModal from "@/components/shared/ui/default-modal";
import {FileVideo} from "lucide-react";
import {deleteYoutube, uploadYoutube} from "@/client/youtube";
import {useAuth} from "@/lib/auth/auth-provider";

const UploadYoutubeWrapper = styled.div`
  width: 315px;
  min-width: 315px;
  max-width: 315px;
  height: 560px;
  min-height: 560px;
  max-height: 560px;
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
  const [api, contextHolder] = notification.useNotification();

  const {userInfo} = useAuth();

  const errorHandle = (e: any) => {
    setErrorMessage(e?.message || '알수 없는 에러');
    setIsError(true)
  }
  const getVideoListData = async () => {
    try {
      setIsLoading(true)
      const response = await getVideoList();
      const uploadList = response?.data.filter(({uploadId, isDeleted}: {
        uploadId: string,
        isDeleted: string
      }) => !!uploadId && isDeleted !== 'Y');
      setUploadVideoList(uploadList);
      const notUploadList = response?.data.filter(({uploadId, isDeleted}: {
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
  const openNotification = (message: string, description?: string) => {
    api.success({
      message,
      description,
      placement: 'topRight',
      duration: 2
    });
  };
  const openErrorNotification = (message: string, description?: string) => {
    api.error({
      message,
      description,
      placement: 'topRight',
      duration: 2
    });
  };
  const uploadYoutubeVideo = async () => {
    try {
      if (!selectUploadVideo) return;
      setUpdateLoading(true)
      const response = await uploadYoutube({videoId: selectUploadVideo});
      setUpdateLoading(false)
      setSelectUploadVideo(undefined)
      setIsModalOpen(false)
      if (response?.result === 'fail') {
        openErrorNotification('영상 업로드에 실패하였습니다.', '잠시 후 다시 시도해 주십시오.')
        return;
      }
      openNotification('영상 업로드가 완료되었습니다!')
      await getVideoListData()
    } catch (e) {
      openErrorNotification('영상 업로드에 실패하였습니다.', '잠시 후 다시 시도해 주십시오.')
      setUpdateLoading(false)
      setSelectUploadVideo(undefined)
    }

  }

  const deleteYoutubeVideo = async (videoId: number) => {
    try {
      await deleteYoutube({videoId});
      openNotification('영상 삭제가 완료되었습니다!')
      await getVideoListData()
    } catch (e) {
      errorHandle(e)
      setUpdateLoading(false)
      setSelectUploadVideo(undefined)
    }
  }

  const UploadVideoComponent = useCallback(() => {
    return (
      <>
        <div className={'mt-3 mb-2 flex'}><FileVideo className={'mr-1'}/>영상 미리보기</div>
        <video controls controlsList="nodownload">
          <source src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/video/preview/${selectUploadVideo}`}
                  type={'video/mp4'}/>
        </video>
      </>
    )
  }, [selectUploadVideo])

  useEffect(() => {
    getVideoListData()
  }, []);

  return (
    <>
      {contextHolder}
      <DefaultModal
        handleHide={() => {
          setIsModalOpen(false)
        }}
        title={`영상 업로드`}
        open={isModalOpen}
        confirmLoading={updateLoading}
        onOk={uploadYoutubeVideo}
        afterClose={() => {
          setUpdateLoading(false)
          setSelectUploadVideo(undefined)
        }}
        width={400}
      >
        <Select options={notUploadVideoList} className={'w-full'} placeholder={'업로드 할 영상을 선택 해주세요'}
                value={selectUploadVideo}
                onSelect={(data) => {
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
      <div className={'flex w-full gap-5 flex-wrap'}>
        <UploadYoutubeWrapper className={'rounded-md'} onClick={() =>
          setIsModalOpen(true)
        }>
          <UploadTitle className={'m-3'}>영상 업로드</UploadTitle>
          <UploadIcon>
            <Image src={ShortsLogo} alt={'shorts'} width={68}/>
          </UploadIcon>
        </UploadYoutubeWrapper>
        {isLoading ?
          <Skeleton.Image active={true} style={{width: '315px', height: '560px'}}/> : uploadVideoList.map((
            {
              uploadId,
              id
            }: {
              uploadId: string;
              id: number;
            }) => {
            return (
              <Badge.Ribbon
                key={uploadId}
                color={userInfo?.trialUser ? 'cyan' : 'red'}
                text={
                  userInfo?.trialUser ? 'Trial' :
                    <Button
                      type={'link'}
                      onClick={async () => {
                        await deleteYoutubeVideo(id)
                      }}
                      style={{color: '#ffffff'}}
                    >
                      Delete
                    </Button>}>
                <iframe
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
              </Badge.Ribbon>
            )
          })}
      </div>
    </>
  )

}