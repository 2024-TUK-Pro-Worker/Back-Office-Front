import {getDefaultLayout, IDefaultLayoutPage, IPageHeader} from "@/components/layout/default-layout";
import PageDescription from "@/components/module/PageDescription";
import {useAuth} from "@/lib/auth/auth-provider";
import {YoutubeIcon} from "lucide-react";
import {YoutubeUpload} from "@/components/page/Youtube";

const pageHeader: IPageHeader = {
  title: "유튜브 업로드",
};

const YoutubeUploadPage: IDefaultLayoutPage = () => {
  const {userInfo} = useAuth();
  return (
    <>
      <PageDescription><YoutubeIcon className={'mr-2'} color={'red'}/> {userInfo?.name || "관리자"}님 생성된 영상을 유튜브에 올려
        보세요!</PageDescription>
      <YoutubeUpload/>
    </>
  );
};

YoutubeUploadPage.getLayout = getDefaultLayout;
YoutubeUploadPage.pageHeader = pageHeader;

export default YoutubeUploadPage;
