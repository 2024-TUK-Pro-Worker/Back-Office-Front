import Spinner from "@/components/shared/spinner";
import {useEffect} from "react";
import {useCookies} from "react-cookie";

const LogoutPage = () => {
  const [, , removeCookie] = useCookies(['authorization']);
  const serviceDomain = (process.env.NEXT_PUBLIC_SERVICE_DOMAIN !== 'localhost') ? `.${process.env.NEXT_PUBLIC_SERVICE_DOMAIN}` : 'localhost';
  useEffect(()=>{
    removeCookie('authorization', {path: '/', domain: serviceDomain});
  },[])
  return (
    <Spinner/>
  );
};

export default LogoutPage;
