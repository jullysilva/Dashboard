import { useEffect, useState } from "react";
import {
  Box,
  DashboardContent,
  Span,
  Text,
  Title,
  TitleHeader,
} from "./Dashboard.styled";
import BoxInline from "src/Components/BoxContent/BoxInline";
import Card from "src/Components/Card/Card";
import Papa from "papaparse";
import DataTable from "src/Components/Table/Table";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as TitleGraph,
  Tooltip,
  Legend,
} from "chart.js";
import {
  calculateActivePercentage,
  calculateEtapaCounts,
  calculateServerCounts,
  countStatuses,
} from "src/Utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TitleGraph,
  Tooltip,
  Legend
);

export interface DashboardProps {
  widgets: null;
  title: string;
}

export const Dashboard = ({ title }: DashboardProps) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [statusCounts, setStatusCounts] = useState({ status1: 0, status2: 0 });
  const [serverCounts, setServerCounts] = useState({
    current: 0,
    migracao: 0,
    outros: 0,
  });
  const [activePercentage, setActivePercentage] = useState(0);
  const [etapaCounts, setEtapaCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchCSVData();
  }, []);

  useEffect(() => {
    if (csvData.length > 0) {
      setStatusCounts(countStatuses(csvData));
      setActivePercentage(calculateActivePercentage(csvData));
      setServerCounts(calculateServerCounts(csvData));
      setEtapaCounts(calculateEtapaCounts(csvData));
    }
  }, [csvData]);

  const fetchCSVData = async () => {
    try {
      const response = await fetch("/ALERT_2024-07-15.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

      Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setCsvData(results.data);
        },
        error: (error) => {
          console.error("Error reading CSV file:", error);
        },
      });
    } catch (error) {
      console.error("Error fetching CSV file:", error);
    }
  };

  const etapaData = {
    labels: Object.keys(etapaCounts),
    datasets: [
      {
        label: "Sumarização de Etapas",
        data: Object.values(etapaCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const columns = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  return (
    <DashboardContent>
      <TitleHeader bg="primary" text="light">
        {title}
      </TitleHeader>
      <BoxInline pad="16" space="evenly" center>
        <Card w="30%">
          <Title>Status</Title>
          <BoxInline space="evenly" center>
            <Span>Sucesso</Span>
            <Box bg="#28a745">
              <Text textColor="white">{statusCounts.status1}</Text>
            </Box>
            <Box bg="#dc3545">
              <Text textColor="white">{statusCounts.status2}</Text>
            </Box>
            <Span>Fracasso</Span>
          </BoxInline>
        </Card>
        <Card>
          <Title>Sucessos (%)</Title>
          <Text textColor="primaryLight">{activePercentage}%</Text>
        </Card>
        <Card>
          <Title>Servidor atual</Title>
          <Text textColor="success">{serverCounts.current}</Text>{" "}
          <Span>{serverCounts.current > 1 ? "servidores" : "servidor"}</Span>
        </Card>
        <Card>
          <Title>Servidor em migração</Title>
          <Text textColor="danger">{serverCounts.migracao}</Text>{" "}
          <Span>{serverCounts.migracao > 1 ? "servidores" : "servidor"}</Span>
        </Card>
      </BoxInline>
      <BoxInline pad="16" w="100%" space="around" center>
        <Card>
          <Title>Clientes</Title>
          {csvData.length > 0 && <DataTable data={csvData} columns={columns} />}
        </Card>
        <Card w="50" h="200vh">
          <Bar
            height="700"
            data={etapaData}
            options={{ maintainAspectRatio: false }}
          />
        </Card>
      </BoxInline>
    </DashboardContent>
  );
};
