import {getVideoList, putVideoDetail, setVideoBgm} from "@/client/video";
import React, {useEffect, useState} from "react";
import DefaultTable from "@/components/shared/ui/default-table";
import {Alert, Button, Drawer, notification, Skeleton, Space} from "antd";
import dayjs from "dayjs";
import DefaultModal from "@/components/shared/ui/default-modal";
import {VideoDetailComponent} from "@/components/page/Video/detail";
import {LoadDataError} from "@/components/module/LoadDataError";

export const VideoList = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editVideoData, setEditVideoData] = useState<any>({})
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isError, setIsError] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const [closable, setClosable] = useState(true)

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

  const errorHandle = (e: any) => {
    setErrorMessage(e?.message || '알수 없는 에러');
    setIsError(true)
  }

  const errorCloseHandle = () => {
    setErrorMessage('')
    setIsError(false);
  }
  const getVideoListData = async () => {
    try {
      setIsLoading(true)
      const response = await getVideoList();
      if (response?.result === 'fail') {
        errorHandle(response)
        setIsLoading(false)
        return
      }
      setDataSource(response?.data
        ?.sort((a: any, b: any) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        })?.sort((a: any, b: any) => {
          if (a.uploadId && !b.uploadId) return 1;
          if (!a.uploadId && b.uploadId) return -1;
          return 0;
        })
        .map((data: any, index: number) => {
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
      setClosable(false)
      const response = await putVideoDetail({
        videoId: editVideoData.id,
        content: editVideoData.content,
        title: editVideoData.title,
        tags: editVideoData.tags
      })
      if (response?.result === 'success' && editVideoData.bgmName) {
        await setVideoBgm({videoId: editVideoData.id, bgmFileName: editVideoData.bgmName})
      }
      setUpdateLoading(false)
      setClosable(true)
      onClose()
      if (response?.result === 'fail') {
        openErrorNotification('영상 업로드에 실패하였습니다.', '잠시 후 다시 시도해 주십시오.')
        return;
      }
      openNotification('업데이트 완료되었습니다!', `${editVideoData.gptTitle} 영상이 업데이트 되었습니다`)
      await getVideoListData()
    } catch (e: any) {
      openErrorNotification('영상 업로드에 실패하였습니다.', '잠시 후 다시 시도해 주십시오.')
      setUpdateLoading(false)
      onClose()
    }
  }

  const onClose = () => {
    if (!closable) return;
    setIsDrawerOpen(false)
  }

  useEffect(() => {
    getVideoListData()
  }, []);

  return (
    <>
      {contextHolder}
      <LoadDataError showIcon={true} type={'error'} isOpen={isError} message={errorMessage}
                     afterClose={errorCloseHandle}/>
      {isLoading ? (<Skeleton/>) : <DefaultTable
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record) => record.editable ? '' : 'edit-disabled'}
        onRow={(record, index) => {
          return {
            style: {cursor: "pointer"},
            onClick: () => {
              if (!record.editable) return;
              setIsDrawerOpen(true);
              setEditVideoData(record);
            }
          }
        }}/>}

      <Drawer
        title={`${editVideoData.gptTitle} 상세 수정`}
        placement={'right'}
        closable={false}
        onClose={onClose}
        open={isDrawerOpen}
        key={'right'}
        width={560}
        mask={true}
        maskClosable={false}
        afterOpenChange={(open: boolean) => {
          if (!open) {
            setEditVideoData({})
          }
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={UpdateDetail} type="primary" loading={updateLoading}>
              Save
            </Button>
          </Space>
        }
      >
        <VideoDetailComponent editVideoData={editVideoData} setEditVideoData={setEditVideoData}/>
      </Drawer>
    </>
  )
}