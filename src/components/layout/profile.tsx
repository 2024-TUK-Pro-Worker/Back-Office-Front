import { useAuth } from "@/lib/auth/auth-provider";
import { Dropdown, MenuProps } from "antd";
import { ChevronDown, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useCallback } from "react";
import {useCookies} from "react-cookie";

const Profile = () => {
  const { userInfo } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['authorization']);

  const handleLogoutClick = useCallback(async () => {
    signOut({ callbackUrl: "/login" });
  }, []);

  const items: MenuProps["items"] = [
    {
      label: (
        <a onClick={() => {removeCookie('authorization');}} className="link-with-icon">
          <LogOut width={16} height={16}/>
          로그아웃
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="ml-2">{userInfo?.name}</div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <button className="flex items-center px-2 text-gray-600 rounded hover:bg-gray-200 enable-transition">
          <span className="sm:max-w-[10rem] ellipsis-text">{userInfo?.email}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </Dropdown>
    </>
  );
};

export default React.memo(Profile);
