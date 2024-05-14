import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "antd";
import Image from "next/image";

const Container = styled.div`
  height: calc(100vh - 3.75rem);
  display: flex;

  h2 {
    color: #cacedb;
    font-weight: 700;
    font-size: 3.75rem;
    margin-bottom: 1.5625rem;
  }

  h3 {
    font-weight: 500;
    font-size: 2.1875rem;
    margin-bottom: 0.625rem;
  }

  p {
    color: #818ea3;
  }
`;

const Content = styled.div`
  padding: 0 0.9375rem;
  display: flex;
  flex-flow: column;
  margin: auto;
  align-items: center;
  text-align: center;
`;

const ErrorStatus = styled.div`
  font-weight: bold;
  color: var(--base-color-primary);
  font-size: 67px;
  word-spacing: 1.73;
`;


const ErrorMessage = styled.div`
  font-weight: bold;
  color: var(--base-color-primary);
  font-size: 43px;
  margin-bottom: 20px;
  word-spacing: 1.73;
`;

function Error() {
  const router = useRouter();
  return (
    <Container>
      <Content>
        <Image src={"/img/logo/logo_removedBackground.png"} alt={"AI Short Maker Logo"} width={200} height={200} onClick={() => {
          router.push("/");
        }}/>
        <ErrorStatus>
          {router.query.error}
        </ErrorStatus>
        <ErrorMessage>
          {router.query.errorMsg}
        </ErrorMessage>
        <Button htmlType="button" type="primary" onClick={() => {
          router.push("/");
        }}>
          메인 페이지로 이동
        </Button>
      </Content>
    </Container>
  );
}

export default Error;
