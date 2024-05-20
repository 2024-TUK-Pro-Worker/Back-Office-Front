import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CalendarSample from "@/components/page/index/calendar-sample";
import { useAuth } from "@/lib/auth/auth-provider";
import { Alert, Divider, Skeleton } from "antd";
import PageDescription from "@/components/module/PageDescription";
import {Dashboard} from "@/components/page/index/Dashboard";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

const IndexPage: IDefaultLayoutPage = () => {
  const { userInfo } = useAuth();

  return (
    <>
      <PageDescription>👋 {userInfo?.name || "관리자"}님 안녕하세요! 생성된 영상들을 요약 해봤어요!</PageDescription>

      <Dashboard/>
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
