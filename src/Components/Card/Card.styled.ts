import { PropsWithChildren } from "react";
import { TPalette } from "src/Interfaces/TPalette";
import styled from "styled-components";

export interface ICardProps extends PropsWithChildren<{}> {
  noPadding?: boolean;
  title?: string;
  color?: TPalette;
  shadow?: boolean;
}

export const CardContainer = styled.div<ICardProps>`
  ${({ theme, noPadding = false, color = "transparent", shadow = true }) => {
    return {
      backgroundColor: "white",
      padding: noPadding ? 0 : 16,
      elevation: 2,
      borderRadius: 15,
      boxShadow: shadow ? "0px 10px 15px -3px rgba(0,0,0,0.1)" : "none",
    };
  }}
`;

export const CardTitle = styled.p<ICardProps>`
  ${({ theme, color = "transparent" }) => {
    return {
      fontSize: 18,
      fontWeight: 700,
      textColor: color !== "transparent" ? theme.palette[color] : color,
    };
  }}
`;

export const TitleContainer = styled.div`
  margin-bottom: 16px;
`;
