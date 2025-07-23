"use client";
import React from "react";
import styled from "styled-components";
import { 
     BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
 } from "recharts";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";


const StyledChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


const ApuChart = ({ data, godina }) => {
   // Grupisanje po mesecu i naponskom nivou
  const groupByMonth = (data) => {
    const grouped = {};
    const allLevels = Array.from(new Set(data.map((item) => item.napon)));

    data.forEach((item) => {
        const key = `${item.mesec_br}_${item.mesec}`;
      if (!grouped[key]) grouped[key] = {};
      grouped[key][item.napon] = {
        uspešni: item.broj_apu,
        neuspešni: item.broj_apu_n || 0, // fallback ako fali
      };
    });

    return Object.entries(grouped)
        .sort(([a], [b]) => parseInt(a.split("_")[0]) - parseInt(b.split("_")[0]))
        .map(([key, naponData]) => {
      const [, mesec] = key.split("_");
      const result = { mesec };
      allLevels.forEach((napon) => {
        const vrednosti = naponData[napon] || { uspešni: 0, neuspešni: 0 };
        result[`${napon}_uspešni`] = vrednosti.uspešni;
        result[`${napon}_neuspešni`] = vrednosti.neuspešni;
      });
      return result;
    });
  };

  const groupedData = groupByMonth(data);
  const naponskiNivoi = Array.from(new Set(data.map((d) => d.napon)));
//    console.log(naponskiNivoi)
  return (
    <div className="w-full h-[500px]">
        <StyledChart>
      <Heading as="h2">Рад АПУ по месецима за {godina}</Heading>
      <ResponsiveContainer width="100%" height={500}>
      <BarChart data={groupedData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mesec" />
        <YAxis />
        <Tooltip />
        <Legend />
        {naponskiNivoi.map((napon) => (
          <React.Fragment key={napon}>
            <Bar
              dataKey={`${napon}_uspešni`}
              key={`${napon}_uspešni`}
              name={`${napon} kV успешни`}
              fill="#82ca9d"
              stackId={napon}
            />
            <Bar
              dataKey={`${napon}_neuspešni`}
              key={`${napon}_neuspešni`}
              name={`${napon} kV неуспешни`}
              fill="#ff7f7f"
              stackId={napon}
            />
          </React.Fragment>
        ))}
      </BarChart>
    </ResponsiveContainer>
      </StyledChart>
    </div>
  );
};

export default ApuChart;
