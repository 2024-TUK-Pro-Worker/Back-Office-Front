import DefaultModal from "@/components/shared/ui/default-modal";
import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

interface ILoginFormValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [form] = useForm<ILoginFormValue>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleFinish = useCallback(async (value: ILoginFormValue) => {
    setIsLoading(true);

    try {
      console.log(value);
      await signIn("login-credentials", { username: value.username, password: value.password });
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {router?.query.error && router?.query.error !== "CredentialsSignin" ? (
        <div className="mb-3">
          <Alert message={`로그인 중 오류가 발생했습니다.`} type="warning" />
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-2">
        <a className="flex items-center justify-center h-20 grow btn" onClick={() => {location.href=`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google/login`;}}>
          <svg width="29" height="29" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30 16.0745c0-.9239-.0756-1.8534-.2352-2.7644H16.9335v5.2394h7.348a6.2977 6.2977 0 0 1-.9369 2.3457c-.4675.7106-1.0742 1.3191-1.7833 1.7888v3.3989h4.384C28.5201 23.7134 30 20.2147 30 16.0745Z"
              fill="#4285F4"
            ></path>
            <path
              d="M16.9306 29.3661c3.6683 0 6.7635-1.2047 9.0176-3.2848l-4.3841-3.4003c-1.2204.8312-2.7943 1.3003-4.6292 1.3003-3.55 0-6.5582-2.3952-7.6389-5.613H4.77368v3.5029c1.13278 2.2532 2.86944 4.1472 5.01613 5.4706 2.14669 1.3235 4.61899 2.0243 7.14079 2.0243Z"
              fill="#34A853"
            ></path>
            <path
              d="M9.29314 18.3684c-.56999-1.6897-.56999-3.5198 0-5.2095V9.65454H4.77367c-.95182 1.89576-1.4475 3.98776-1.4475 6.10916 0 2.1213.49568 4.2133 1.4475 6.1091l4.51947-3.5044Z"
              fill="#FBBC04"
            ></path>
            <path
              d="M16.9308 7.54168c1.9395-.03135 3.8136.70088 5.2181 2.03875l3.885-3.88361c-2.4631-2.3116-5.7253-3.5802-9.1031-3.54001-2.5227-.00052-4.9958.70057-7.14293 2.0249-2.14713 1.32433-3.88363 3.21971-5.01541 5.47428l4.51947 3.50441c1.07497-3.22497 4.08887-5.61872 7.63887-5.61872Z"
              fill="#EA4335"
            ></path>
          </svg>
          로그인
        </a>
      </div>
    </>
  );
};

export default React.memo(LoginForm);
