// Table.styled.ts
import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

export const StatusCell = styled(TableCell)<{ status: number }>`
  color: ${({ status }) => (status === 1 ? "#28a745" : "#dc3545")};
`;
