import React from "react";
import {
  CardContainer,
  CardTitle,
  ICardProps,
  TitleContainer,
} from "./Card.styled";

const Card: React.FC<ICardProps> = ({ children, ...CardContentSCProps }) => {
  return (
    <CardContainer>
      {CardContentSCProps.title && (
        <TitleContainer>
          <CardTitle>{CardContentSCProps.title}</CardTitle>
        </TitleContainer>
      )}
      {children}
    </CardContainer>
  );
};

export default Card;
