/**
 * 백오피스 특성상 기본적으로 인증 필요
 * 인증된 사용자 정보를 얻거나 로그인 페이지로 이동
 */
import Spinner from "@/components/shared/spinner";
import {useCookies} from "react-cookie";
import {useJwt} from "react-jwt";
import {useRouter} from "next/router";
import React, {createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState} from "react";

interface IAuthContext {
  userInfo: any;
}

const AuthContext = createContext<IAuthContext>({userInfo: null});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
  const {decodedToken, isExpired} = useJwt(cookies.authorization);
  const [isLoading, setLoading] = useState(true);  // 로딩 상태 추가
  const router = useRouter();

  useEffect(() => {
    // 로딩 상태 확인을 위한 초기화
    if (cookies.authorization) {
      // 토큰 존재 시 로딩 상태 업데이트
      setLoading(false);
    } else {
      // 토큰 미존재 시 바로 로그인 페이지로 이동하지 않고 로딩 상태 업데이트
      setTimeout(() => setLoading(false), 500); // 또는 적절한 초기화 로직
    }
  }, [cookies.authorization]);

  useEffect(() => {
    console.log(decodedToken, router.pathname)
    if (!isLoading && !decodedToken && router.pathname !== '/login') {
      if (isExpired || !decodedToken) {
        removeCookie('authorization', {path: '/'});  // 쿠키 삭제
        router.push('/login');
      }
      router.push('/login');
    }else if(!isLoading && !decodedToken && router.pathname === '/login'){
      router.push('/');
    }
  }, [isLoading, router, decodedToken, removeCookie, isExpired]);

  if (isLoading) {
    // 로딩 중 표시 처리
    return <Spinner/>;
  }
  // 로그인 상태를 제공하는 컨텍스트
  return <AuthContext.Provider value={{userInfo: decodedToken}}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthProvider);
