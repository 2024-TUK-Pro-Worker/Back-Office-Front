import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import { useAuth } from "@/lib/auth/auth-provider";
import PageDescription from "@/components/module/PageDescription";
import { VideoList } from "@/components/page/Video";

const pageHeader: IPageHeader = {
  title: "영상 관리",
};

const VideoListPage: IDefaultLayoutPage = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <PageDescription>🎥 {userInfo?.name || "관리자"}님 생성된 영상 확인 해보셨나요??</PageDescription>
      <VideoList/>
    </>
  );
};

VideoListPage.getLayout = getDefaultLayout;
VideoListPage.pageHeader = pageHeader;

export default VideoListPage;
