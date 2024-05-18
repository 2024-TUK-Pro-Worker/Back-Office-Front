import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import PageDescription from "@/components/module/PageDescription";
import {useAuth} from "@/lib/auth/auth-provider";
import {BGM} from "@/components/page/Account/BGM";

const pageHeader: IPageHeader = {
  title: "배경음악 관리",
};

const BGMPage: IDefaultLayoutPage = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <PageDescription>🎼 {userInfo?.name || "관리자"}님! 풍성한 영상을 위한 첫걸음! 영상에 추가할 배경음악을 등록 해보세요! 🎼</PageDescription>
      <BGM/>
    </>
  );
};

BGMPage.getLayout = getDefaultLayout;
BGMPage.pageHeader = pageHeader;

export default BGMPage;
