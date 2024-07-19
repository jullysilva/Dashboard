import { PropsWithChildren } from "react";
import { TPalette } from "src/Interfaces/TPalette";
import styled from "styled-components";

export interface ICardProps extends PropsWithChildren<{}> {
  noPadding?: boolean;
  title?: string;
  w?: string;
  h?: string;
  color?: TPalette;
  shadow?: boolean;
}

export const CardContainer = styled.div<ICardProps>`
  ${({ noPadding = false, shadow = true, w, h }) => {
    const [width, height] = buildSize(w, h);
    return {
      backgroundColor: "white",
      padding: noPadding ? 0 : 16,
      borderRadius: 15,
      margin: 8,
      width: w ? width : "auto",
      height,
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

export const buildSize = (w: ICardProps["w"], h: ICardProps["h"]) => {
  const sizes = [w, h];
  return sizes.map((s) => {
    if (s !== "auto") {
      if (typeof s === "string") {
        if (s.includes("%") || s.includes("px")) {
          return s;
        }
        return `${s}%`;
      }
      if (typeof s === "number") {
        return `${s}%`;
      }
    }
    return s;
  });
};
