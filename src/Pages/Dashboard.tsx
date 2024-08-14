import { useEffect, useState } from "react";
import {
  Box,
  DashboardContent,
  Divider,
  Span,
  Status,
  SubText,
  Text,
  Title,
  TitleHeader,
  WidgetIcon,
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
    <DashboardContent>
      <TitleHeader bg="primary" text="light">
        {title}
      </TitleHeader>
      <BoxContent pad="16 32 0" w="100%">
        <Span>
          As informações a seguir fornecem uma visão geral do desempenho do
          status dos clientes e seus devidos servidores, comtemplando o
          percentual de sucesso e a quantidade de migrações.
        </Span>
      </BoxContent>
      <BoxInline pad="16">
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
      <BoxContent w="100%" pad="0 0 0 32">
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
      <BoxContent w="100%" inline>
        <BoxInline pad="16" w="50%" flex={1} wrap>
          {csvData
            .filter((item) => item.Status === 1)
            .map((item, index) => (
              <Card w="30%" key={index}>
                <Text textColor="primary">{item.Customer}</Text>
                <BoxContent>
                  <BoxInline w="100%" space="between">
                    <SubText textColor="dark">Status</SubText>
                    <Status status={item.Status as number}>
                      {item.Status === 1 ? "Success" : "Failed"}
                    </Status>
                  </BoxInline>
                  <BoxInline w="100%" space="between">
                    <SubText textColor="dark">Step</SubText>
                    <Span>{item.Step}</Span>
                  </BoxInline>
                </BoxContent>
              </Card>
            ))}
        </BoxInline>
        <BoxInline pad="16" w="50%" flex={1} wrap>
          {csvData
            .filter((item) => item.Status === 2)
            .map((item, index) => (
              <Card w="30%" key={index}>
                <Text textColor="primary">{item.Customer}</Text>
                <BoxContent>
                  <BoxInline w="100%" space="between">
                    <SubText textColor="dark">Status</SubText>
                    <Status status={item.Status as number}>
                      {item.Status === 1 ? "Success" : "Failed"}
                    </Status>
                  </BoxInline>
                  <BoxInline w="100%" space="between">
                    <SubText textColor="dark">Step</SubText>
                    <Span>{item.Step}</Span>
                  </BoxInline>
                </BoxContent>
              </Card>
            ))}
        </BoxInline>
      </BoxContent>
    </DashboardContent>
  );
};
