import React, { useEffect, useState } from "react";
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
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import DataTable from "src/Components/Table/Table";
import BoxContent from "src/Components/BoxContent/BoxContent";
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

export const Dashboard = ({ widgets, title }: DashboardProps) => {
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
      countStatuses();
      calculateActivePercentage();
      calculateServerCounts();
      calculateEtapaCounts();
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

  const calculateEtapaCounts = () => {
    const counts: { [key: string]: number } = {};
    csvData.forEach((row) => {
      const etapa = row.Etapa.toLowerCase();
      if (etapa) {
        counts[etapa] = (counts[etapa] || 0) + 1;
      }
    });
    setEtapaCounts(counts);
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

  const calculateServerCounts = () => {
    const counts = { current: 0, migracao: 0, outros: 0 };
    csvData.forEach((row) => {
      const servidor = row.Servidor ? row.Servidor.toLowerCase() : "";

      if (servidor === "current") {
        counts.current += 1;
      } else if (servidor === "migracao") {
        counts.migracao += 1;
      } else {
        counts.outros += 1;
      }
    });
    setServerCounts(counts);
  };

  const calculateActivePercentage = () => {
    const activeCount = csvData.filter((row) => row.Status === 1).length;
    const totalCount = csvData.length;
    const percentage = ((activeCount / totalCount) * 100).toFixed(2);
    setActivePercentage(Number(percentage));
  };

  const countStatuses = () => {
    const counts = csvData.reduce(
      (acc, row) => {
        if (row.Status === 1) {
          acc.status1 += 1;
        } else if (row.Status === 2) {
          acc.status2 += 1;
        }
        return acc;
      },
      { status1: 0, status2: 0 }
    );
    setStatusCounts(counts);
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
            <Span>ativado</Span>
            <Box bg="#28a745">
              <Text textColor="white">{statusCounts.status1}</Text>
            </Box>
            <Box bg="#dc3545">
              <Text textColor="white">{statusCounts.status2}</Text>
            </Box>
            <Span>não-ativo</Span>
          </BoxInline>
        </Card>
        <Card>
          <Title>Ativados (%)</Title>
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
        <Card w="50" h="100vh">
          <Bar data={etapaData} options={{ maintainAspectRatio: false }} />
        </Card>
      </BoxInline>
    </DashboardContent>
  );
};
