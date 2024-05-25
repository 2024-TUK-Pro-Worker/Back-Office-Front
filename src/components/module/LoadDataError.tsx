import {FC} from "react";
import {Alert} from "antd";

interface ILoadDataErrorProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  showIcon: boolean;
  isOpen: boolean;
  afterClose?: () => void
}

export const LoadDataError: FC<ILoadDataErrorProps> = ({message, type, showIcon, isOpen, afterClose}) => {
  return isOpen ? (
    <div className="my-5">
      <Alert message={message} type={type} showIcon={showIcon} afterClose={afterClose}/>
    </div>
  ) : (<></>)
}