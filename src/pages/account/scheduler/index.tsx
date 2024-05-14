import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";

const pageHeader: IPageHeader = {
  title: "스케줄러 설정",
};

const SchedulaPage: IDefaultLayoutPage = () => {
  return (
    <>
    </>
  );
};

SchedulaPage.getLayout = getDefaultLayout;
SchedulaPage.pageHeader = pageHeader;

export default SchedulaPage;
