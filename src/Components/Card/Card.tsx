import React from "react";
import { Card, CardTitle, ICardProps } from "./Card.styled";

const CardItem: React.FC<ICardProps> = ({
  children,
  ...CardContentSCProps
}) => {
  return (
    <Card w={CardContentSCProps.w} h={CardContentSCProps.h}>
      {CardContentSCProps.title && (
        <CardTitle>{CardContentSCProps.title}</CardTitle>
      )}
      {children}
    </Card>
  );
};

export default CardItem;
