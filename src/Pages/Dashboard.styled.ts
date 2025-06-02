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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  flex-wrap: wrap;

  padding: 2rem;
  background-color: #f4f6f8;
  min-height: 100vh;
`;

export const Header = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #111827;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-auto-rows: 150px;
  gap: 1rem;
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
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
  ${({ theme }) => {
    return {
      fontSize: "1rem",
      color: theme.palette["secondaryLight"],
    };
  }}
`;

export const Divider = styled.hr`
  border-top: 1px solid dark;
  margin: 15px 0px;
`;

export const Status = styled.p<{ status: number }>`
  background-color: ${(p) => (p.status === 1 ? "#d4edda" : "#f8d7da")};
  color: ${(p) => (p.status === 1 ? "#155724" : "#721c24")};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.75rem;
`;

export const WidgetIcon = styled.div`
  border-radius: 3px;
  margin: 0 1rem 0 0;
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
