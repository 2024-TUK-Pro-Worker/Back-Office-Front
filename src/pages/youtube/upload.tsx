import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";

const pageHeader: IPageHeader = {
  title: "유튜브 업로드",
};

const YoutubeUploadPage: IDefaultLayoutPage = () => {
  return (
    <>
    </>
  );
};

YoutubeUploadPage.getLayout = getDefaultLayout;
YoutubeUploadPage.pageHeader = pageHeader;

export default YoutubeUploadPage;
