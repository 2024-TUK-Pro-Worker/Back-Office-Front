import {Dispatch, FC} from "react";
import styled from "styled-components";
import {Input} from "antd";

const Container = styled.div`
  height: 500px;
`
export const VideoDetailComponent: FC<{ editVideoData: any, setEditVideoData: Dispatch<any> }> = ({
                                                                                                    editVideoData,
                                                                                                    setEditVideoData
                                                                                                  }) => {
  return (
    <Container className={'shadow-sm border-gray-200 border rounded-lg w-full'}>
      <Input
        className="w-96 m-5"
        onChange={(e) => {
          console.log(e.target.value)
        }}
        name={'title'}
        value={editVideoData.title}
      />
      <Input
        className="w-96 m-5"
        onChange={(e) => {
          console.log(e.target.value)
        }}
        name={'content'}
        value={editVideoData.content}
      />
      <Input
        className="w-96 m-5"
        onChange={(e) => {
          console.log(e.target.value)
        }}
        name={'content'}
        value={editVideoData.content}
      />
    </Container>
  )
}