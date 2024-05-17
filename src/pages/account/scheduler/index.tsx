import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import {AccountScheduler} from "@/components/page/Account/Scheduler";
import PageDescription from "@/components/module/PageDescription";
import {useAuth} from "@/lib/auth/auth-provider";

const pageHeader: IPageHeader = {
  title: "스케줄러 설정",
};

const SchedulaPage: IDefaultLayoutPage = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <PageDescription>⏰ {userInfo?.name || "관리자"}님~ 영상 생성을 위해 스케줄러를 설정 해보세요 😆</PageDescription>
      <AccountScheduler/>
    </>
  );
};

SchedulaPage.getLayout = getDefaultLayout;
SchedulaPage.pageHeader = pageHeader;

export default SchedulaPage;
