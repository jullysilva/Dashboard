export const calculateEtapaCounts = (csvData) => {
  const counts: { [key: string]: number } = {};
  csvData.forEach((row) => {
    const etapa = row.Step.toLowerCase();
    if (etapa) {
      counts[etapa] = (counts[etapa] || 0) + 1;
    }
  });
  return counts;
};

export const calculateServerCounts = (csvData) => {
  const counts = { current: 0, migracao: 0, outros: 0 };
  csvData.forEach((row) => {
    const servidor = row.Server ? row.Server.toLowerCase() : "";

    if (servidor === "current") {
      counts.current += 1;
    } else if (servidor === "migration") {
      counts.migracao += 1;
    } else {
      counts.outros += 1;
    }
  });
  return counts;
};

export const calculateActivePercentage = (csvData) => {
  const activeCount = csvData.filter((row) => row.Status === 1).length;
  const totalCount = csvData.length;
  const percentage = ((activeCount / totalCount) * 100).toFixed(2);
  return Number(percentage);
};

export const countStatuses = (csvData) => {
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
  return counts;
};
