import React, { useEffect } from "react";
import { GetServerSideProps } from 'next';
import { useErrorContext } from '@/context/Error';

interface Props {
  statusCode: number;
  isRedirect: boolean;
}

const Error: React.FC<Props> = ({ isRedirect }) => {
  const errorContext = useErrorContext();
  useEffect(() => {
    if (isRedirect) {
      errorContext({ error: 404, errorMsg: '페이지를 찾을수 없습니다' });
    }
  }, []);
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const statusCode = res ? res.statusCode : 404;
  const isRedirect = true;
  return {
    props: {
      isRedirect,
      statusCode,
    },
  };
};

export default Error;
