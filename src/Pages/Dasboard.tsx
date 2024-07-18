import React, { useEffect, useState } from "react";
import { DashboardContent, TitleHeader } from "./Dashboard.style";
import BoxContent from "src/Components/BoxContent/BoxContent";
import Card from "src/Components/Card/Card";
import BoxInline from "src/Components/BoxContent/BoxInline";
import Papa from "papaparse";

export interface DashboardProps {
  widgets: null;
  title: string;
}

export const Dashboard = ({ widgets, title }: DashboardProps) => {
  const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    fetchData();
  }, [jsonData]);

  const fetchData = () => {
    const file = "../ALERT_2024-07-15.csv";
    const fileType = file.split(".").pop().toLowerCase();
    if (fileType !== "csv") {
      alert("Please upload a CSV file.");
      return;
    }
    Papa.parse(file, {
      step: function (row) {
        console.log("Row:", row.data);
      },
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
    });

    const res = JSON.stringify(csvData, null, 2);
    setJsonData(res);
  };

  return (
    <DashboardContent>
      <TitleHeader bg="primary" text="light">
        {title}
      </TitleHeader>
      {/* {widgets?.map((widget: Widgets) => (
				<Widget content={widget} className="dashboard__widget" />
			))} */}
      <BoxInline bg="light" h="100" space="evenly" pad="16">
        <Card>
          <p>Palavrrinhas magicas</p>
        </Card>
        <Card>
          <p>Palavrrinhas magicas</p>
        </Card>
        <Card>
          <p>Palavrrinhas magicas</p>
        </Card>
      </BoxInline>
    </DashboardContent>
  );
};
