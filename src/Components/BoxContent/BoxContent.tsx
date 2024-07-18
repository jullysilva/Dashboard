import React from "react";
import { BoxContentSC, IBoxContentProps } from "./BoxContent.styled";

const BoxContent: React.FC<IBoxContentProps> = ({
  children,
  ...boxContentSCProps
}) => {
  return <BoxContentSC {...boxContentSCProps}>{children}</BoxContentSC>;
};

export default BoxContent;
