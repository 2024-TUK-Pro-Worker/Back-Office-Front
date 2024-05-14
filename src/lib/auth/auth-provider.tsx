/**
 * 백오피스 특성상 기본적으로 인증 필요
 * 인증된 사용자 정보를 얻거나 로그인 페이지로 이동
 */
import Spinner from "@/components/shared/spinner";
import {useCookies} from "react-cookie";
import {useJwt} from "react-jwt";
import {useRouter} from "next/router";
import React, {createContext, PropsWithChildren, useContext, useEffect} from "react";

interface IAuthProviderProps {
}

interface IAuthContext {
  initialized: boolean;
  userInfo: any;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error("Auth context must be used within a AuthProvider!");
  }
  return result;
}

const publicPageList = ["/login"];

const isPublicPage = (pathname: string) => {
  return publicPageList.includes(pathname);
};

const AuthProvider = ({children}: PropsWithChildren<IAuthProviderProps>) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
  const {decodedToken, isExpired} = useJwt<{name: string, email: string}>(cookies.authorization);

  useEffect(() => {
    console.log(isExpired);
    if (router.pathname === "/useError" || router.pathname === "/_error" ){
      return;
    }
    if (decodedToken && isPublicPage(router.pathname)) {
      router.push("/");
    } else if (!decodedToken && !isPublicPage(router.pathname)) {
      router.push("/login");
    } else if (decodedToken && isExpired && !isPublicPage(router.pathname)) {
      removeCookie('authorization');
      router.push("/login");
    }
  }, [router, decodedToken, isExpired, removeCookie]);

  if (decodedToken && isPublicPage(router.pathname)) {
    return <Spinner />;
  }

  if (isPublicPage(router.pathname)) {
    return <>{children}</>;
  }

  if (!decodedToken?.name) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={{ initialized: true, userInfo: decodedToken }}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthProvider);
