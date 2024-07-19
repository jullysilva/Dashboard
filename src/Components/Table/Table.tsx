// Table.tsx
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  StatusCell,
} from "./Table.styled";

interface TableProps {
  data: Array<{ [key: string]: string | number }>;
  columns: string[];
}

const DataTable: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          {columns.map((column) => (
            <TableHeader key={column}>{column}</TableHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => {
              if (column === "Status") {
                return (
                  <StatusCell key={column} status={row[column] as number}>
                    {row[column] === 1 ? "Ativo" : "Desativado"}
                  </StatusCell>
                );
              } else {
                return <TableCell key={column}>{row[column]}</TableCell>;
              }
            })}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
