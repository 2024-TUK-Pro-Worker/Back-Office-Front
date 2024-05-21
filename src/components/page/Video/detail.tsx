import {ChangeEvent, CSSProperties, Dispatch, FC, useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Divider, Input, InputRef, Progress, Select, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {getBgmListApi} from "@/client/bgm";
import {Divide} from "lucide-react";

const Container = styled.div`
  height: 500px;
`
export const VideoDetailComponent: FC<{ editVideoData: any, setEditVideoData: Dispatch<any> }> = (
  {
    editVideoData,
    setEditVideoData
  }) => {

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bgmOption, setBgmOption] = useState([]);
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    console.log(editVideoData)
  }, [editVideoData]);

  const tagPlusStyle: CSSProperties = {
    borderStyle: 'dashed',
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (!inputValue) {
      setInputVisible(false);
      return
    }
    setEditVideoData((old: any) => {
      const tags = [...(old?.tags || [])]
      tags.push(inputValue)
      return {
        ...old,
        tags,
      }
    })
    setInputVisible(false);
    setInputValue('');
  };

  const handleTagRemove = (i: number) => {
    setEditVideoData((old: any) => {
      const tags = [...(old?.tags || [])]
      tags.splice(i, 1)
      return {
        ...old,
        tags
      }
    })
  }

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEditVideoData({...editVideoData, [e.target.name]: e.target.value})

  };

  const bgmList = async () => {
    setIsLoading(true)
    const response = await getBgmListApi();
    if (response.result === 'success') {
      const data = response.data?.bgmList?.map((title: string) => {
        return {
          value: title,
          label: title,
        }
      })
      setBgmOption(data)
    }
    setIsLoading(false)
  }


  const AudioComponent = useCallback(() => {
    return (
      <audio controls={true} controlsList="nodownload" className={'mt-4'}>
        <source
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/account/bgm/preview/${editVideoData.bgmName.replace('.mp3', '')}`}
          type={'audio/mpeg'}/>
      </audio>
    )
  }, [editVideoData.bgmName])

  const VideoPreview = useCallback(()=>{
    return (
      <video controls controlsList="nodownload">
        <source src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/video/preview/${editVideoData.id}`}
                type={'video/mp4'}/>
      </video>
    )
  }, [editVideoData.id])

  useEffect(() => {
    bgmList()
  }, [])

  return (
    <>
      <div className={'flex flex-col flex-wrap gap-3'}>
        <div className="title">영상 제목</div>
        <Input
          className="w-full"
          onChange={handleInputValue}
          name={'title'}
          value={editVideoData.title}
          placeholder={'영상 제목을 입력하세요.'}
        />
        <div className="title">영상 설명</div>
        <Input
          className="w-full"
          onChange={handleInputValue}
          name={'content'}
          value={editVideoData.content}
          placeholder={'영상 설명을 입력하세요.'}
        />
        <div className="title">영상 태그</div>
        <div className={'flex flex-wrap gap-2'}>
          {editVideoData.tags?.map((tag: string, i: number) => {
            if (!tag) {
              return;
            }

            return (
              <Tag key={i} closable onClose={() => {
                console.log(tag, i)
                handleTagRemove(i)
              }}>{tag}</Tag>
            )
          })}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{width: 78}}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag onClick={showInput} style={tagPlusStyle}>
              <PlusOutlined/> New Tag
            </Tag>
          )}
        </div>
        <div className="title mt-2">영상 배경음악 설정</div>
        {editVideoData.appendBgm ?
          (<Progress
            type="circle"
            percent={100}
            size={80}
            format={() => editVideoData.appendBgm === 'error' ? 'error' : 'Done'}
            status={editVideoData.appendBgm === 'error' ? 'exception' : undefined}/>) :
          (<>
            <Select
              className={'w-full'}
              value={editVideoData.bgmName}
              options={bgmOption}
              placeholder={'배경음악 선택.'}
              loading={isLoading}
              onSelect={(value) => {
                setEditVideoData({...editVideoData, bgmName: value})
              }}/>
            {!!editVideoData.bgmName && (
              <AudioComponent/>
            )}
          </>)}
        <Divider>미리보기</Divider>
        <VideoPreview/>
      </div>
    </>

  )
}