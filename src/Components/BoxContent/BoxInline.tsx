import React from "react";
import { BoxSpaceSC, IBoxSpaceProps } from "./BoxContent.styled";

const BoxInline: React.FC<IBoxSpaceProps> = ({
  children,
  ...boxContentSCProps
}) => {
  return (
    <BoxSpaceSC {...boxContentSCProps} inline>
      {children}
    </BoxSpaceSC>
  );
};

export default BoxInline;
