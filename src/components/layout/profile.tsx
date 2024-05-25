import {useAuth} from "@/lib/auth/auth-provider";
import {Dropdown, MenuProps} from "antd";
import {ChevronDown} from "lucide-react";
import React from "react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const Profile = () => {
  const {userInfo} = useAuth();
  const router = useRouter();


  const items: MenuProps["items"] = [
    {
      label: (
        <a href={'/login'} onClick={async () => {
          await router.push('/logout')
        }} className="link-with-icon">
          로그아웃
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="ml-2">{userInfo?.name}</div>
      <Dropdown menu={{items}} trigger={["click"]}>
        <button className="flex items-center px-2 text-gray-600 rounded hover:bg-gray-200 enable-transition">
          <span className="sm:max-w-[10rem] ellipsis-text">{userInfo?.email}</span>
          <ChevronDown className="w-5 h-5"/>
        </button>
      </Dropdown>
    </>
  );
};

export default React.memo(Profile);
