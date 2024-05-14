import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";

const pageHeader: IPageHeader = {
  title: "스케줄러 설정",
};

const SchedulerManagementPage: IDefaultLayoutPage = () => {
  return (
    <>
    </>
  );
};

SchedulerManagementPage.getLayout = getDefaultLayout;
SchedulerManagementPage.pageHeader = pageHeader;

export default SchedulerManagementPage;
