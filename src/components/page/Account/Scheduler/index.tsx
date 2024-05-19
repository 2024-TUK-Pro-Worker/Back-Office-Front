import {FC, ReactNode, useEffect, useState} from "react";
import {
  getPrompt,
  getScheduler,
  getSchedulerDelete,
  getSchedulerStart,
  getSchedulerStatus,
  getSchedulerUpdate,
  patchPrompt
} from "@/client/account";
import {Button, Card, Col, Divider, notification, Result, Row, TreeSelect, Typography, Input} from "antd";
import {ResultStatusType} from "antd/es/result";
import DefaultModal from "@/components/shared/ui/default-modal";

const {TextArea} = Input;
const {Text} = Typography;

const cronSelectData = [{
  title: '분 마다 반복',
  value: 'minutes',
  selectable: false,
  children: [
    {
      title: '20분 마다 반복',
      value: '*/20 * * * *',
    },
    {
      title: '30분 마다 반복',
      value: '*/30 * * * *',
    },
    {
      title: '40분 마다 반복',
      value: '*/40 * * * *',
    },
    {
      title: '50분 마다 반복',
      value: '*/50 * * * *',
    }
  ]
},
  {
    title: '시간 마다 반복',
    value: 'hours',
    selectable: false,
    children: [
      {
        title: '1시간 마다 반복',
        value: '0 */1 * * *',
      },
      {
        title: '2시간 마다 반복',
        value: '0 */2 * * *',
      },
      {
        title: '3시간 마다 반복',
        value: '0 */3 * * *',
      },
      {
        title: '4시간 마다 반복',
        value: '0 */4 * * *',
      },
      {
        title: '5시간 마다 반복',
        value: '0 */5 * * *',
      },
      {
        title: '6시간 마다 반복',
        value: '0 */6 * * *',
      }
    ]
  }]
export const AccountScheduler: FC<any> = () => {
  const [expression, setExpression] = useState('');
  const [cronStatus, setCronStatus] = useState<{
    status: ResultStatusType;
    title: string;
    subTitle?: string;
  }>({
    status: 'warning',
    title: '스케줄러 상태를 확인하지 못했어요.',
  })
  const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode }>({title: '', content: ''});
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [api, contextHolder] = notification.useNotification();

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
  const getSchedulerExpression = async () => {
    const response = await getScheduler();
    console.log(response?.data?.cronSchedule);
    setExpression(response?.data?.cronSchedule || '')
  }

  const getSchedulerNowStatus = async () => {
    const response = await getSchedulerStatus()
    if (response.result === 'fail') {
      setCronStatus({status: 'error', title: '스케줄러가 설정 되어있지 않아요.', subTitle: '스케줄러 설정에서 원하는 시간으로 등록 해보세요!'})
    } else {
      if (response.scheduleInfo.active) {
        setCronStatus({status: 'success', title: '스케줄러가 정상 작동하고 있어요.', subTitle: '만들어진 영상을 유튜브에 업로드 해보세요!'})
      } else {
        setCronStatus({status: 'success', title: '스케줄러가 중지 상태에요.', subTitle: '스케줄러를 다시 실행하여, 영상을 생성 해보세요!'})
      }
    }
  }
  const cronDeleteOk = async () => {
    setDeleteLoading(true)
    const response = await getSchedulerDelete();
    if (response?.result === 'success') {
      openSuccessNotification('스케줄러 삭제에 성공하였습니다.')
    } else {
      openErrorNotification('스케줄러 삭제에 실패하였습니다.', '잠시 후 다시 시도 해주십시오.')
    }
    setDeleteLoading(false)
    setModalOpen(false)
    await getSchedulerExpression()
    await getSchedulerNowStatus()
  }

  const buttonClickHandle = async () => {
    if (cronStatus.status === 'success') {
      //삭제
      setModalOpen(true)
      setModalContent({
        title: '정말 삭제 하시겠습니까?',
        content: (<>삭제하면 <Text type={'danger'}>되돌릴수 없습니다.</Text> 그래도 정말 삭제 하시겠습니까?</>)
      })
    } else {
      // 추가
      const response = await getSchedulerUpdate({schedule: expression});
      if (response?.result === 'success') {
        await getSchedulerStart()
        openSuccessNotification('스케줄러 설정에 성공하였습니다.')
      } else {
        openErrorNotification('스케줄러 설정에 실패하였습니다.', '잠시 후 다시 시도 해주십시오.')
      }
    }
    await getSchedulerExpression()
    await getSchedulerNowStatus()
  }

  const getPromptContent = async () => {
    const response = await getPrompt()
    if (response?.result === 'success') setPrompt(response?.data?.content || '')
  }

  const savePromptContent = async () => {
    const response = await patchPrompt({content: prompt});
    if (response?.result === 'success') {
      openSuccessNotification('변경에 성공하였습니다.', '프롬프트를 정상적으로 변경하였습니다!')
      await getPromptContent()
    } else {
      openErrorNotification('변경에 실패하였습니다.', '잠시 후 다시 시도 해주십시오.')
    }
  }

  useEffect(() => {
    getSchedulerExpression()
    getSchedulerNowStatus()
    getPromptContent()
  }, [])


  return (
    <div>
      {contextHolder}
      <DefaultModal
        handleHide={() => {
          setModalOpen(false)
        }}
        title={modalContent.title}
        open={isModalOpen}
        confirmLoading={isDeleteLoading}
        onOk={cronDeleteOk}>
        {modalContent.content}
      </DefaultModal>
      <Divider orientation="center">스케줄러</Divider>
      <Row>
        <Col span={8} offset={2} style={{minWidth: 360, maxWidth: 360, width: 360}}>
          <Card title={'스케줄러 설정'}>
            <TreeSelect
              className={'mr-2'}
              style={{width: '100%'}}
              value={expression}
              treeData={cronSelectData}
              placeholder={'사용할 스케줄을 선택 해주세요.'}
              onChange={(e) => {
                setExpression(e);
              }}/>
            <Button
              className={'float-end mt-3'}
              htmlType={'button'}
              type={'primary'}
              disabled={cronStatus.status !== 'success' && !expression}
              onClick={buttonClickHandle}
              danger={cronStatus.status === 'success'}>{cronStatus.status === 'success' ? '삭제하기' : '설정하기'}</Button>
          </Card>
        </Col>
        <Col span={8} offset={2} style={{minWidth: 360}}>
          <Card title={'스케줄러 상태'}>
            <Result
              status={cronStatus.status}
              title={cronStatus.title}
              subTitle={cronStatus.subTitle}/>
          </Card>
        </Col>
      </Row>
      <Divider orientation="center">프롬프트</Divider>
      <Row>
        <Col span={19} offset={2} style={{minWidth: 800}}>
          <Card title={'프롬프트 관리'}>
            <TextArea
              value={prompt}
              style={{height: 200, resize: 'none'}}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <Button
              className={'float-end mt-3'}
              type={"primary"}
              onClick={savePromptContent}
            >저장하기</Button>
          </Card>
        </Col>
      </Row>


    </div>
  )
}