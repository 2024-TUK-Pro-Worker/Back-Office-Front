import {FC, useEffect, useState} from "react";
import {getBgmListApi, insertBgmListApi} from "@/client/bgm";
import {Skeleton, Upload, message, UploadProps, Button, notification} from "antd";
import DefaultTable from "@/components/shared/ui/default-table";
import {InboxOutlined} from "@ant-design/icons";

const {Dragger} = Upload;

const columns = [{
  title: '배경 음악 제목',
  dataIndex: 'title',
  key: 'title',
},
  {
    title: '미리듣기',
    dataIndex: 'preview',
    key: 'preview',
    render: (text: string | null) => {
      return (
        <audio controls={true} controlsList="nodownload">
          <source src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/account/bgm/preview/${text}`} type={'audio/mpeg'}/>
        </audio>
      )
    }
  }]
export const BGM: FC<any> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [fileList, setFileList] = useState<any[]>([])
  const [api, contextHolder] = notification.useNotification();

  const props: UploadProps = {
    name: 'fileList',
    multiple: true,
    accept: '.mp3',
    action: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/account/bgm/insert`,
    fileList,
    beforeUpload: file => {
      setFileList((old)=>{
        old.push(file)
        return old
      });
      return false;
    }
  };

  const openErrorNotification = (message: string, description?: string) => {
    api.error({
      message,
      description,
      placement: 'topRight',
      duration: 2
    });
  };

  const openSuccessNotification = (message: string, description?: string) => {
    api.success({
      message,
      description,
      placement: 'topRight',
      duration: 2
    });
  };

  const bgmList = async () => {
    setIsLoading(true)
    const response = await getBgmListApi();
    if (response?.result === 'success') {
      const data = response?.data?.bgmList?.map((title: string) => {
        return {
          title,
          preview: title.replace('.mp3', '')
        }
      })
      setDataSource(data)
    }
    setIsLoading(false)
  }

  const bgmInsert = async () => {
    setIsUploadLoading(true)
    const formData = new FormData()
      fileList.forEach(file => formData.append('fileList', file))
    const response = await insertBgmListApi(formData)
    if (response?.result === 'success') {
      openSuccessNotification('배경 음악 업로드를 성공 하였습니다!')
      await bgmList()
      setFileList([])
    }else{
      openErrorNotification('배경 음악 업로드를 실패 하였습니다.','잠시 후 다시 시도해 주세요.')
    }
    setIsUploadLoading(false)
  }


  useEffect(() => {
    bgmList()
  }, [])
  return (
    <>
      {contextHolder}
      <Dragger {...props} >
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">여기를 클릭하거나 파일을 드래그하여 배경 음악을 올려보세요!</p>
        <p className="ant-upload-hint">
          확장자는 .mp3만 가능하며 등록할 땐 하단 등록하기 버튼을 클릭 해야 합니다.
        </p>
        <Button
          className={'mt-2'}
          loading={isUploadLoading}
          iconPosition={'end'}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!fileList?.length) return;
            await bgmInsert();
          }}>등록하기</Button>
      </Dragger>
      {isLoading ? (<Skeleton className={'mt-5 mb-3'}/>) : <DefaultTable
        className={'mt-5 mb-3'}
        columns={columns}
        dataSource={dataSource}
        onRow={(record, index) => {
          return {
            style: {cursor: "pointer"},
            onClick: () => {
            }
          }
        }}/>}
    </>
  )
}