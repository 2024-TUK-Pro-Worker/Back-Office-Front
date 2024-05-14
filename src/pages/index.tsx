import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CalendarSample from "@/components/page/index/calendar-sample";
import { useAuth } from "@/lib/auth/auth-provider";
import { Alert, Divider, Skeleton } from "antd";
import PageDescription from "@/components/module/PageDescription";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

const IndexPage: IDefaultLayoutPage = () => {
  const { userInfo } = useAuth();

  return (
    <>
      <PageDescription>👋 {userInfo?.name || "관리자"}님 안녕하세요!</PageDescription>

      <div className="my-5">
        <Alert message="대시보드 API 호출 중 오류가 발생했습니다." type="warning" />
      </div>

      <Divider />

      <h3 className="title">달력</h3>

      <CalendarSample />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
