import React, {FC, useEffect, useState} from "react";
import {Alert, Badge, Calendar, CalendarProps, Divider, Tooltip} from "antd";
import dayjs, {Dayjs} from "dayjs";
import {getVideoList} from "@/client/video";
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import locale from "antd/es/calendar/locale/ko_KR";

import 'dayjs/locale/ko'
import {LoadDataError} from "@/components/module/LoadDataError";

const CustomCalendar = Calendar.generateCalendar<Dayjs>(dayjsGenerateConfig);

const ERROR_MESSAGE = '업로드 된 영상을 불러오기 실패했습니다. 잠시 후 다시 시도해 주십시오.'
export const Dashboard: FC<any> = () => {
  const [videoDataList, setVideoDataList] = useState([])
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(ERROR_MESSAGE)
  const getVideoListDashboard = async () => {
    const response = await getVideoList();
    if (response?.result === 'success') {
      setVideoDataList(response?.data || [])
    }else if(response?.result === 'fail'){
      setErrorMessage(response?.message || ERROR_MESSAGE)
    }else{
      setIsError(true)
    }
  }

  const getListDataByDate = (value: Dayjs) => {
    const formatValue = value.format('YYYY-MM-DD')
    const createDateFilter = videoDataList.filter((video: any) => {
      return dayjs(video.createdAt).format('YYYY-MM-DD') === formatValue
    }) || []

    const uploadDateFilter = videoDataList.filter((video: any) => {
      return dayjs(video.uploadAt).format('YYYY-MM-DD') === formatValue
    }) || []
    const creatList = createDateFilter.map((video: any) => {
      return {
        type: 'create',
        color: 'green',
        content: video.gptTitle,
        tooltip: `생성 날짜: ${dayjs(video.createdAt).format('YY년 M월 D일 h시 m분')}`,
      }
    })

    const uploadList = uploadDateFilter.map((video: any) => {
      return {
        type: 'upload',
        color: 'red',
        content: video.gptTitle,
        tooltip: `업로드 날짜: ${dayjs(video.createdAt).format('YY년 M월 D일 h시 m분')}`,
      }
    })
    return [...creatList, ...uploadList];
  };

  const getListDataByMonth = (value: Dayjs) => {
    const formatValue = value.format('YYYY-MM')
    const createDateFilter: any[] = videoDataList.filter((video: any) => {
      return dayjs(video.createdAt).format('YYYY-MM') === formatValue
    }) || []
    const uploadDateFilter: any[] = videoDataList.filter((video: any) => {
      return dayjs(video.uploadAt).format('YYYY-MM') === formatValue
    }) || []
    return {
      createCount: createDateFilter.length,
      uploadCount: uploadDateFilter.length,
      createTooltip: `${createDateFilter[0]?.gptTitle || ''}${createDateFilter.length > 1 ? ` 외 +${createDateFilter.length - 1}` : ''} `,
      uploadTooltip: `${uploadDateFilter[0]?.gptTitle || ''}${uploadDateFilter.length > 1 ? ` 외 +${uploadDateFilter.length - 1}` : ''} `
    };
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListDataByDate(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <Tooltip key={item.content + item.type} title={item.tooltip}>
            <li>
              <Badge color={item.color} text={item.content}/>
            </li>
          </Tooltip>
        ))}
      </ul>
    );
  };

  const monthCellRender = (value: Dayjs) => {
    const {createCount, uploadCount, createTooltip, uploadTooltip} = getListDataByMonth(value);
    return (
      <ul className="events">
        {createCount > 0 && (<li>
          <Tooltip title={createTooltip}>
            <Badge count={createCount} color={'green'} showZero={false} offset={[22, 6]}>생성된 영상</Badge>
          </Tooltip>
        </li>)}

        {uploadCount > 0 && (<li>
          <Tooltip title={uploadTooltip}>
            <Badge count={uploadCount} color={'red'} showZero={false} offset={[22, 6]}>엽로드 영상</Badge>
          </Tooltip>
        </li>)}

      </ul>
    );
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const DateCellRender = (date: Dayjs) => {
    return (
      <Badge count={2}/>
    )
  }

  useEffect(() => {
    getVideoListDashboard()
  }, []);


  return (
    <>
      <LoadDataError showIcon={true} type={'error'} isOpen={isError} message={errorMessage}/>
      <Divider/>
      <ul className="events">
        <li>
          <Badge color={'green'} text={'생성된 영상'}/>
        </li>
        <li>
          <Badge color={'red'} text={'업로드 영상'}/>
        </li>
      </ul>
      <CustomCalendar
        cellRender={cellRender}
        locale={locale}
      />
    </>
  )
}