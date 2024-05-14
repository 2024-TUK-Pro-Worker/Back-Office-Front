import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";

const pageHeader: IPageHeader = {
  title: "프롬프트 설정",
};

const PromptPage: IDefaultLayoutPage = () => {
  return (
    <>
    </>
  );
};

PromptPage.getLayout = getDefaultLayout;
PromptPage.pageHeader = pageHeader;

export default PromptPage;
