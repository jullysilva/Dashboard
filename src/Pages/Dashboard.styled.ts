import { TPalette } from "src/Interfaces/TPalette";
import styled from "styled-components";

export interface IDadhsboardProps {
  text?: TPalette;
  bg?: TPalette;
}

export interface IBoxProps {
  bg?: string;
}

export interface IText extends IDadhsboardProps {
  textColor: TPalette;
}

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  flex-wrap: wrap;
`;

export const TitleHeader = styled.h1<IDadhsboardProps>`
  ${({ theme, text = "black", bg = "white" }) => {
    return {
      color: text !== "black" ? theme.palette[text] : text,
      backgroundColor: bg !== "white" ? theme.palette[bg] : bg,
      margin: 0,
      padding: "20px 0",
      textAlign: "center",
    };
  }}
`;

export const Title = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

export const Text = styled.span<IText>`
  ${({ theme, textColor = "black" }) => {
    return {
      color: theme.palette[textColor],
    };
  }}
  font-size: 2rem;
  font-weight: 400;
`;

export const Span = styled.span`
  font-size: 1.5rem;
  color: #2112121;
`;

export const Widget = styled.div`
  margin: 0.5rem;
  border-radius: 3px;
  padding: 1rem;
`;

export const Box = styled.div<IBoxProps>`
  padding: 4px;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => bg};
  border-radius: 15%;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;
