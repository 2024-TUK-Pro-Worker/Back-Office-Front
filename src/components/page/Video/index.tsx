import {getVideoList, putVideoDetail} from "@/client/video";
import {useEffect, useState} from "react";
import DefaultTable from "@/components/shared/ui/default-table";
import {Skeleton} from "antd";
import dayjs from "dayjs";
import DefaultModal from "@/components/shared/ui/default-modal";
import {VideoDetailComponent} from "@/components/page/Video/detail";

export const VideoList = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVideoData, setEditVideoData] = useState<any>({})
  const [updateLoading, setUpdateLoading] = useState(false);
  const getVideoListData = async () => {
    setIsLoading(true)
    const a = await getVideoList();
    setDataSource(a.data.map((data: any, index: number) => {
      return {
        key: index,
        ...data
      }
    }))
    setIsLoading(false)
  }

  const columns = [
    {
      title: '생성 제목',
      dataIndex: 'gptTitle',
      key: 'gptTitle',
    },
    {
      title: '업로드 제목',
      dataIndex: 'title',
      key: 'title',
      render: (text: string | null) => {
        if (text) return text;
        return '업로드 된 영상이 아닙니다.'
      }
    },
    {
      title: '삭제 유무',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
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

  useEffect(() => {
    getVideoListData()
  }, []);

  return (
    <>
      <DefaultModal
        handleHide={() => {
          setIsModalOpen(false)
        }}
        title={`${editVideoData.gptTitle} 상세 수정`}
        open={isModalOpen}
        confirmLoading={updateLoading}
        onOk={async () => {
          setUpdateLoading(true)
          await putVideoDetail({
            videoId: editVideoData.id,
            content: editVideoData.content,
            title: editVideoData.title,
            tags: editVideoData.tags
          })
          setUpdateLoading(false)
          setIsModalOpen(false)
        }}>
        <VideoDetailComponent editVideoData={editVideoData} setEditVideoData={setEditVideoData}/>
      </DefaultModal>
      {isLoading ? (<Skeleton/>) : <DefaultTable columns={columns} dataSource={dataSource} onRow={(record, index) => {
        return {
          style: {cursor: "pointer"},
          onClick: () => {
            setIsModalOpen(true);
            setEditVideoData(record);
            console.log(record, index);
          }
        }
      }}></DefaultTable>}
    </>
  )
}