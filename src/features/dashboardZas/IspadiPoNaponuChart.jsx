import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  margin-bottom: 3rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const colorMap = {
  "Uspešno": "#22c55e",
  "Trajni kvar": "#f97316",
  "Nepoznato": "#3b82f6",
  "Zatajilo": "#a855f7",
};

function formatData(naponskiObjekat) {
  return [
    {
      duration: "Uspešno",
      value: naponskiObjekat.uspe,
      color: colorMap["Uspešno"],
    },
    {
      duration: "Trajni kvar",
      value: naponskiObjekat.ntrk,
      color: colorMap["Trajni kvar"],
    },
    {
      duration: "Nepoznato",
      value: naponskiObjekat.nnpz,
      color: colorMap["Nepoznato"],
    },
    {
      duration: "Zatajilo",
      value: naponskiObjekat.zata,
      color: colorMap["Zatajilo"],
    },
  ].filter((item) => item.value > 0); // uklanja 0 vrednosti
}

function IspadiPoNaponuChart({ data }) {
  return (
    <>
      {data.map((naponObj) => {
        const chartData = formatData(naponObj);
console.log("Dogadjaji iz ", data);
// console.log(formatData(naponObj));
        return (
          <ChartBox key={naponObj.napon}>
            <Heading as="h2">Испади по врсти догађаја – {naponObj.nap_nelp}</Heading>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={chartData}
                  nameKey="duration"
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                  cx="40%"
                  cy="50%"
                  paddingAngle={3}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.duration}
                      fill={entry.color}
                      stroke={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  width="30%"
                  layout="vertical"
                  iconSize={15}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>
        );
      })}
    </>
  );
}

export default IspadiPoNaponuChart;
