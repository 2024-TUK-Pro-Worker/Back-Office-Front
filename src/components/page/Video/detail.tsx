import {ChangeEvent, CSSProperties, Dispatch, FC, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Input, InputRef, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";

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
    };
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

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEditVideoData({...editVideoData, [e.target.name]: e.target.value})

  };


  return (
    <Container className={'shadow-sm border-gray-200 border rounded-lg w-full'}>
      <div
        className="w-96 m-5"
      >
        <div className="title mb-2">영상 제목</div>
        <Input
          className="w-full"
          onChange={handleInputValue}
          name={'title'}
          value={editVideoData.title}
        />
      </div>
      <div
        className="w-96 m-5"
      >
        <div className="title mb-2">영상 설명</div>
        <Input
          className="w-full"
          onChange={handleInputValue}
          name={'content'}
          value={editVideoData.content}
        />
      </div>

      <div
        className="w-96 m-5"
      >
        <div className="title mb-2">영상 태그</div>
        {editVideoData.tags?.map((tag: string, i: number) => {
          return (
            <Tag key={i} closable onClose={() => {
              console.log(tag, i)
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

    </Container>
  )
}