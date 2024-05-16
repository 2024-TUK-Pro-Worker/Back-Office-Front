import { ReactNode, memo, FC } from "react";

interface IPageDescriptionProps{
  children: ReactNode| string;
}
const PageDescription:FC<IPageDescriptionProps> = ({children}) => {
  return (
    <h2 className="title flex">{children}</h2>
  )
}

export default memo(PageDescription)