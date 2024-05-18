import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import {AccountScheduler} from "@/components/page/Account/Scheduler";
import PageDescription from "@/components/module/PageDescription";
import {useAuth} from "@/lib/auth/auth-provider";

const pageHeader: IPageHeader = {
  title: "시스템 설정",
};

const AccountPage: IDefaultLayoutPage = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <PageDescription>⏰ {userInfo?.name || "관리자"}님~ 영상 생성을 위해 스케줄러를 설정 해보세요 😆</PageDescription>
      <AccountScheduler/>
    </>
  );
};

AccountPage.getLayout = getDefaultLayout;
AccountPage.pageHeader = pageHeader;

export default AccountPage;
