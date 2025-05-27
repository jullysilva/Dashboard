import { PropsWithChildren } from "react";
import { TPalette } from "src/Interfaces/TPalette";
import styled from "styled-components";

export interface ICardProps extends PropsWithChildren<{}> {
  title?: string;
  w?: string;
  h?: string;
  color?: TPalette;
}

export const Card = styled.div<ICardProps>`
  ${({ w, h }) => {
    return {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.07)",
    };
  }}

  h3 {
    text-align: center;
    font-size: 1.2rem;
    color: rgb(66, 70, 78);
  }

  h4 {
    font-size: 0.9rem;
    color: #6b7280;
  }

  span {
    font-size: 1.5rem;
    font-weight: 400;
    color: #111827;
  }
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
