/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from "styled-components";
import { TPalette } from "../../Interfaces/TPalette";
import { PropsWithChildren } from "react";

export interface IBoxContentProps extends PropsWithChildren<{}> {
  pad?: string;
  marg?: string;
  bg?: TPalette;
  w?: string | number;
  h?: string | number;
  inline?: boolean;
  centerContent?: boolean;
  centerItems?: boolean;
  wrap?: boolean;
  flex?: number;
}

export const BoxContentSC = styled.div<IBoxContentProps>`
  ${({
    theme,
    pad = "0 0 0 0",
    marg = "0 0 0 0",
    bg = "transparent",
    w = "auto",
    h = "auto",
    inline = false,
    centerContent = false,
    centerItems = false,
    wrap = false,
    flex = 0,
  }) => {
    const [width, height] = buildSize(w, h);
    return {
      display: "flex",
      padding: buildSpace(pad),
      margin: buildSpace(marg),
      "background-color": bg !== "transparent" ? theme.palette[bg] : bg,
      width,
      height,
      ...(flex && { flex }),
      "flex-direction": inline ? "row" : "column",
      alignItems: "baseline",
      ...(centerContent && {
        justifyContent: "center",
      }),
      ...(centerItems && {
        alignItems: "center",
      }),
      ...(wrap && {
        "flex-wrap": "wrap",
      }),
    };
  }}
`;

export interface IBoxSpaceProps extends IBoxContentProps {
  space?: "between" | "around" | "evenly";
  justify?: "start" | "end" | "center";
  alignItems?: "center" | "flex-end";
}

export const BoxSpaceSC = styled(BoxContentSC)<IBoxSpaceProps>`
  ${({ space, justify, alignItems, inline = true }) => {
    return {
      "flex-direction": inline ? "row" : "column",
      ...(space && { justifyContent: `space-${space}` }),
      ...(justify && { justifyContent: `flex-${justify}` }),
      ...(alignItems && { alignItems: `${alignItems}` }),
    };
  }}
`;

export const buildSize = (
  w: IBoxContentProps["w"],
  h: IBoxContentProps["h"]
) => {
  const sizes = [w, h];
  return sizes.map((s) => {
    if (s !== "auto") {
      if (typeof s === "string") {
        if (s.includes("%") || s.includes("px")) {
          return s;
        }
        return `${s}vh`;
      }
      if (typeof s === "number") {
        return `${s}vh`;
      }
    }
    return s;
  });
};
export const buildSpace = (spacings: string) => {
  const splitedSpaces = spacings.split(" ");
  const spacingns = splitedSpaces.map((s) => `${s}px`).join(" ");
  return spacingns;
};
