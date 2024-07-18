import { TPalette } from "src/Interfaces/TPalette";
import styled from "styled-components";

export interface IDadhsboardProps {
  text?: TPalette;
  bg?: TPalette;
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
    };
  }}
`;

export const Widget = styled.div`
  margin: 0.5rem;
  border-radius: 3px;
  padding: 1rem;
`;

export const WidgetTitle = styled.p`
  margin-top: 0;
`;

export const WidgetValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const WidgetInfo = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  font-style: italic;
  opacity: 0.75;
`;

export const WidgetBlock = styled.div`
  text-align: center;
`;
