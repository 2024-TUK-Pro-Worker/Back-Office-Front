import {IDefaultLayoutPage} from "@/components/layout/default-layout";
import SeoHead from "@/components/layout/seo-head";
import AuthProvider from "@/lib/auth/auth-provider";
import "@/styles/globals.css";
import {ConfigProvider} from "antd";
import koKR from "antd/locale/ko_KR";
import {NextComponentType} from "next";
import type {AppProps} from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import {Suspense, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {ErrorContext} from "@/context/Error";
import Spinner from "@/components/shared/spinner";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  const getLayout =
    (Component as IDefaultLayoutPage).getLayout ||
    ((Page: NextComponentType, props: Record<string, unknown>) => <Page {...props} />);
  const [error, setError] = useState<
    { error: string; errorMsg: string } | undefined
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/login') {
      setError(undefined);
    } else if (!!error) {
      (async () => {
        const cloneError = {...error};
        setError(undefined);
        await router.push({pathname: '/useError', query: cloneError});
      })();
    }
  }, [error]);

  return (
    <>
      <Suspense fallback={<Spinner/>}>
        <SeoHead/>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png"/>
          <link rel="android-chrome" sizes="192x192" href="/img/favicon/android-chrome-192x192.png"/>
          <link rel="android-chrome" sizes="512x512" href="/img/favicon/android-chrome-512x512.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/img/favicon/site.webmanifest"/>
        </Head>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "rgb(20, 132, 236)",
              colorLink: "rgb(12, 68, 118)",
              colorLinkHover: "rgb(120, 188, 240)",
            },
          }}
          locale={koKR}
        >
          <ErrorContext.Provider value={setError}>
            <AuthProvider>
              <main className={`${pretendard.variable} font-sans`}>{getLayout(Component, pageProps)}</main>
            </AuthProvider>
          </ErrorContext.Provider>
        </ConfigProvider>
      </Suspense>
    </>
  );
}
