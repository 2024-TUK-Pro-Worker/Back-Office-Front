import {FC, useCallback, useEffect, useState} from "react";
import {
  getScheduler,
  getSchedulerDelete,
  getSchedulerStart,
  getSchedulerStatus,
  getSchedulerUpdate
} from "@/client/account";
import cronstrue from 'cronstrue';
import {Button, Card, Col, Divider, Input, notification, Result, Row, Statistic} from "antd";
import Cron from "react-js-cron";
import styled from "styled-components";
import {ResultStatusType} from "antd/es/result";

const CronSettingContainer = styled.div`
  .react-js-cron {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 6px;
  }

  .react-js-cron > div, .react-js-cron-field {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`
export const AccountScheduler: FC<any> = () => {
  const [expression, setExpression] = useState({input: '* * * * *', cron: '* * * * *'});
  const [cronStatus, setCronStatus] = useState<{
    status: ResultStatusType;
    title: string;
    subTitle?: string;
  }>({
    status: 'warning',
    title: '스케줄러 상태를 확인하지 못했어요.',
  })
  const [api, contextHolder] = notification.useNotification();

  const openErrorNotification = ( message: string, description?: string) => {
    api.error({
      message,
      description,
      placement: 'topRight',
      duration: 2
    });
  };

  const openSuccessNotification = ( message: string, description?: string) => {
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
    setExpression({
      input: response?.data?.cronSchedule || '* * * * *',
      cron: response?.data?.cronSchedule || '* * * * *'
    })
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

  const buttonClickHandle = async () => {
    if (cronStatus.status === 'success') {
      //삭제
      const response = await getSchedulerDelete();
      if (response?.result === 'success') {
        openSuccessNotification('스케줄러 삭제에 성공하였습니다.', '잠시 후 다시 시도 해주십시오.')
      }else{
        openErrorNotification('스케줄러 삭제에 실패하였습니다.', '잠시 후 다시 시도 해주십시오.')
      }
    } else {
      // 추가
      const response = await getSchedulerUpdate({schedule: expression.cron});
      if (response?.result === 'success') {
        await getSchedulerStart()
        openSuccessNotification('스케줄러 설정에 성공하였습니다.', '잠시 후 다시 시도 해주십시오.')
      }else{
        openErrorNotification('스케줄러 설정에 실패하였습니다.', '잠시 후 다시 시도 해주십시오.')
      }
    }
    await getSchedulerExpression()
    await getSchedulerNowStatus()
  }

  useEffect(() => {
    getSchedulerExpression()
    getSchedulerNowStatus()
  }, [])


  return (
    <div>
      {contextHolder}
      <Divider orientation="center">스케줄러</Divider>
      <Row>
        <Col span={8} offset={2}>
          <Card title={'스케줄러 설정'} style={{minWidth: 360}}>
            <Input value={expression.input} onChange={(e) => {
              setExpression({
                ...expression,
                input: e.target.value,
              })
            }}
                   onBlur={(e) => {
                     setExpression({
                       cron: e.target.value,
                       input: e.target.value,
                     })
                   }}
            />
            <CronSettingContainer className={'mt-3'}>
              <Cron value={expression.cron || '* * * * *'} setValue={(exp: string) => {
                setExpression({
                  input: exp,
                  cron: exp
                })
              }}/>
            </CronSettingContainer>
            <Statistic className={'mt-3'} title="설정 값" value={cronstrue.toString(expression.cron)}/>
            <Button
              className={'mt-2'}
              htmlType={'button'}
              type={'primary'}
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


    </div>
  )
}