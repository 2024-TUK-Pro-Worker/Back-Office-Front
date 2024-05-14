import { Divider } from "antd";
import { Home, Monitor, User, Video, Youtube } from "lucide-react";
import React from "react";
import Menu, { IMenu } from "./nav";

const mainMenuData: IMenu[] = [
  {
    id: "home",
    name: "홈",
    icon: <Home className="w-5 h-5" />,
    link: {
      path: "/",
    },
  },
  {
    id: "video",
    name: "영상 관리",
    icon: <Video className="w-5 h-5" />,
    link: { path: "/video/list" },
  },
  {
    id: "youtube",
    name: "유튜브 업로드",
    icon: <Youtube className="w-5 h-5" />,
    link: { path: "/youtube/upload" },
  },
  {
    id: "account",
    name: "계정 관리",
    icon: <User className="w-5 h-5" />,
    submenu: [
      {
        id: "accountScheduler",
        name: "스켸줄러 설정",
        link: {
          path: "/account/scheduler",
        },
      },
      {
        id: "accountSchedulerManagement",
        name: "스케줄러 관리",
        link: {
          path: "/account/scheduler/management",
        },
      },
      {
        id: "accountPrompt",
        name: "프롬프트 설정",
        link: {
          path: "/account/prompt",
        },
      },
    ],
  },
];

const devMenuData: IMenu[] = [
  {
    id: "dev",
    name: "사용 가이드",
    icon: <Monitor className="w-5 h-5" />,
    submenu: [
      {
        name: "폼",
        link: {
          path: "/sample/form",
        },
      },
    ],
  },
];

const MainMenu = () => {
  return (
    <>
      <>
        <Divider orientation="left" plain>
          메인
        </Divider>

        <Menu data={mainMenuData} />
      </>
      <>
        <Divider orientation="left" plain>
          개발
        </Divider>

        <Menu data={devMenuData} />
      </>
    </>
  );
};

export default React.memo(MainMenu);
