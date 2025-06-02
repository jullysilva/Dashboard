import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Span,
  Status,
  Text,
  Title,
  Header,
  WidgetIcon,
  Cards,
} from "./Dashboard.styled";
import BoxInline from "src/Components/BoxContent/BoxInline";
import Card from "src/Components/Card/Card";
import Papa from "papaparse";
import {
  calculateActivePercentage,
  calculateEtapaCounts,
  calculateServerCounts,
  countStatuses,
} from "src/Utils";
import BoxContent from "src/Components/BoxContent/BoxContent";
import {
  BiAnalyse,
  BiBarChartSquare,
  BiCoinStack,
  BiHelpCircle,
} from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { theme } from "src/theme";

export interface DashboardProps {
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
      const response = await fetch("/ALERT_Final.csv");
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

  csvData.forEach((item) => console.log(item));

  return (
    <Container>
      <Header>{title}</Header>
      <BoxContent w="100%">
        <Span>
          As informações a seguir fornecem uma visão geral do desempenho do
          status dos clientes e seus devidos servidores, comtemplando o
          percentual de sucesso e a quantidade de migrações.
        </Span>
      </BoxContent>
      <BoxInline marg="12 0" space="between">
        <Card w="30%">
          <Title>
            Status{" "}
            <BiHelpCircle
              color={theme.palette.dark}
              data-tooltip-id="status"
              data-tooltip-content="Comparativo de sucessos e fracassos dos servidores."
            />
          </Title>
          <Tooltip id="status" />
          <BoxInline space="evenly" centerContent centerItems>
            <Text textColor="secondaryLight">Success</Text>
            <Box bg="#28a745">
              <Text textColor="white">{statusCounts.status1}</Text>
            </Box>
            <Box bg="#dc3545">
              <Text textColor="white">{statusCounts.status2}</Text>
            </Box>
            <Text textColor="secondaryLight">Failed</Text>
          </BoxInline>
        </Card>
        <Card w="20%">
          <Title>
            Current Server{" "}
            <BiHelpCircle
              color={theme.palette.dark}
              data-tooltip-id="current-server"
              data-tooltip-content="Informações sobre o servidor atual"
            />
          </Title>
          <Tooltip id="current-server" />
          <BoxInline alignItems="center" space="between">
            <WidgetIcon>
              <BiCoinStack fontSize={40} color={theme.palette.primary} />
            </WidgetIcon>
            <Text textColor="success">
              {serverCounts.current}{" "}
              <Text textColor="dark">
                {serverCounts.current > 1 ? "servers" : "server"}
              </Text>
            </Text>
          </BoxInline>
        </Card>
        <Card w="20%">
          <Title>
            Success{" "}
            <BiHelpCircle
              color={theme.palette.dark}
              data-tooltip-id="success"
              data-tooltip-content="Informações sobre o percentual de sucesso de servidores dos clientes"
            />
          </Title>
          <Tooltip id="success" />
          <BoxInline alignItems="center" space="between">
            <WidgetIcon>
              <BiBarChartSquare fontSize={40} color={theme.palette.success} />
            </WidgetIcon>
            <Text textColor="secondaryLight">{activePercentage}%</Text>
          </BoxInline>
        </Card>
        <Card w="15%">
          <Title>
            Migrating Server{" "}
            <BiHelpCircle
              color={theme.palette.dark}
              data-tooltip-id="migrate-server"
              data-tooltip-content="Informações sobre os servidores em migração."
            />
          </Title>
          <Tooltip id="migrate-server" />
          <BoxInline alignItems="center" space="around">
            <WidgetIcon>
              <BiAnalyse fontSize={40} color={theme.palette.danger} />
            </WidgetIcon>
            <Text textColor="danger">
              {serverCounts.migracao}{" "}
              <Text textColor="dark">
                {serverCounts.migracao > 1 ? "servers" : "server"}
              </Text>
            </Text>
          </BoxInline>
        </Card>
      </BoxInline>
      <BoxContent w="100%" pad="0">
        <Text textColor="primary">
          Customers{" "}
          <BiHelpCircle
            fontSize={20}
            color={theme.palette.dark}
            data-tooltip-id="clients"
            data-tooltip-content="Detalhes gerais sobre cada cliente."
          />
        </Text>
        <Tooltip id="clients" />
      </BoxContent>
      <Divider />
      <Cards>
        {csvData.map((item, index) => (
          <Card key={index}>
            <h3>{item.Customer}</h3>
            <BoxContent>
              <BoxInline w="100%" space="between">
                <h4>Status</h4>
                <Status status={item.Status as number}>
                  {item.Status === 1 ? "Success" : "Failed"}
                </Status>
              </BoxInline>
              <BoxInline w="100%" space="between">
                <h4>Step</h4>
                <Span>{item.Step}</Span>
              </BoxInline>
            </BoxContent>
          </Card>
        ))}
      </Cards>
    </Container>
  );
};
