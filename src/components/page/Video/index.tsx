import {getVideoList} from "@/client/video";
import {useEffect, useState} from "react";
import DefaultTable from "@/components/shared/ui/default-table";
import {Skeleton} from "antd";

export const VideoList = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    getVideoListData()
  }, []);
  const dataSource2 = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

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
    },
    {
      title: '삭제 유무',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
    },
    {
      title: '생성된 시간',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '업로드 시간',
      dataIndex: 'uploadAt',
      key: 'uploadAt',
    },

    {
      title: '삭제된 시간',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
    },
  ];
  return (
    <>
      {isLoading ? (<Skeleton />) : <DefaultTable columns={columns} dataSource={dataSource}></DefaultTable>}
    </>
  )
}