import {getVideoList, putVideoDetail, setVideoBgm} from "@/client/video";
import {useEffect, useState} from "react";
import DefaultTable from "@/components/shared/ui/default-table";
import {Alert, notification, Skeleton} from "antd";
import dayjs from "dayjs";
import DefaultModal from "@/components/shared/ui/default-modal";
import {VideoDetailComponent} from "@/components/page/Video/detail";

export const VideoList = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVideoData, setEditVideoData] = useState<any>({})
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description?: string) => {
    api.success({
      message,
      description,
      placement: 'topRight',
      duration: 2
    });
  };

  const errorHandle = (e: any) => {
    setErrorMessage(e?.message || '알수 없는 에러');
    setIsError(true)
  }
  const getVideoListData = async () => {
    try {
      setIsLoading(true)
      const response = await getVideoList();
      setDataSource(response?.data?.map((data: any, index: number) => {
        return {
          key: index,
          editable: !data.uploadId,
          ...data
        }
      }))
      setIsLoading(false)
    } catch (e) {
      errorHandle(e)
      setIsLoading(false)
    }

  }

  const columns = [
    {
      title: '생성 제목',
      dataIndex: 'gptTitle',
      key: 'gptTitle',
    },
    {
      title: '영상 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text: string | null) => {
        if (text) return text;
        return '설정된 제목이 없습니다.'
      }
    },
    {
      title: '영상 설명',
      dataIndex: 'content',
      key: 'content',
      render: (text: string | null) => {
        if (text) return text;
        return '설정된 내용이 없습니다.'
      }
    },
    {
      title: '배경음악 유무',
      dataIndex: 'appendBgm',
      key: 'appendBgm',
      render: (text: string | boolean) => {
        if (typeof text === 'string') return '확인 할 수 없습니다.';
        if (text) {
          return '배경음악 있음'
        } else {
          return '배경음악 없음'
        }
      }
    },
    {
      title: '삭제 유무',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: 90,
      render: (text: string) => {
        switch (text) {
          case 'Y':
            return '삭제됨';
          case 'N':
            return ' - ';
        }
      }
    },
    {
      title: '생성된 시간',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string | null) => {
        if (text) return dayjs(text).format('YYYY년 M월 D일 HH시 m분 s초');
        return ' - '
      }
    },
    {
      title: '업로드 시간',
      dataIndex: 'uploadAt',
      key: 'uploadAt',
      render: (text: string | null) => {
        if (text) return dayjs(text).format('YYYY년 M월 D일 HH시 m분 s초');
        return ' - '
      }
    },
    {
      title: '삭제된 시간',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      render: (text: string | null) => {
        if (text) return dayjs(text).format('YYYY년 M월 D일 HH시 m분 s초');
        return ' - '
      }
    },
  ];

  const UpdateDetail = async () => {
    try {
      setUpdateLoading(true)
      await putVideoDetail({
        videoId: editVideoData.id,
        content: editVideoData.content,
        title: editVideoData.title,
        tags: editVideoData.tags
      })
      if (editVideoData.bgmName) {
        await setVideoBgm({videoId: editVideoData.id, bgmFileName: editVideoData.bgmName})
      }
      setUpdateLoading(false)
      setIsModalOpen(false)
      openNotification('업데이트 완료되었습니다!', `${editVideoData.gptTitle} 영상이 업데이트 되었습니다`)
      await getVideoListData()
    } catch (e: any) {
      errorHandle(e)
      setUpdateLoading(false)
      setIsModalOpen(false)
    }
  }

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
        title={`${editVideoData.gptTitle} 상세 수정`}
        open={isModalOpen}
        confirmLoading={updateLoading}
        onOk={UpdateDetail}>
        <VideoDetailComponent editVideoData={editVideoData} setEditVideoData={setEditVideoData}/>
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
      {isLoading ? (<Skeleton/>) : <DefaultTable
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record) => record.editable ? '' : 'edit-disabled'}
        onRow={(record, index) => {
          return {
            style: {cursor: "pointer"},
            onClick: () => {
              if (!record.editable) return;
              setIsModalOpen(true);
              setEditVideoData(record);
            }
          }
        }}/>}
    </>
  )
}