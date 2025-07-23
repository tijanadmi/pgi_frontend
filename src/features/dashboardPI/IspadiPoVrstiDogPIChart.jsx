import styled from "styled-components";
import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "APU Uspešno",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "Prol. kvar",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "Uzas .kvar",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "Ispad",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "Isp. pod  rukom",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "APU Neuspešno",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "Smetnja",
    value: 0,
    color: "#0ea5e9",
  },
  {
    duration: "Potencijalni kvar",
    value: 0,
    color: "#06b6d4",
  },
  {
    duration: "Konzum u mraku",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "Traj. kvar",
    value: 0,
    color: "#a855f7",
  },
  {
    duration: "Ostalo",
    value: 0,
    color: "#06b6d4",
  },
  {
    duration: "Prekid isporuke",
    value: 0,
    color: "#facc15",
  },
];

const startDataDark = [
  {
    duration: "APU Uspešno",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "Prol. kvar",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "Uzas .kvar",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "Ispad",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "Isp. pod  rukom",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "APU Neuspešno",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "Smetnja",
    value: 0,
    color: "#0369a1",
  },
  {
    duration: "Potencijalni kvar",
    value: 0,
    color: "#0e7490",
  },
  {
    duration: "Konzum u mraku",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "Traj. kvar",
    value: 0,
    color: "#7e22ce",
  },
  {
    duration: "Ostalo",
    value: 0,
    color: "#0e7490",
  },
  {
    duration: "Prekid isporuke",
    value: 0,
    color: "#ca8a04",
  },
];


function prepareData(startData, dogadjaji) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = dogadjaji
    .reduce((arr, cur) => {
      const num = cur.vrpd;
      if (num === "1") return incArrayValue(arr, "APU Uspešno");
      if (num === "3") return incArrayValue(arr, "Prol. kvar");
      if (num === "4") return incArrayValue(arr, "Uzas .kvar");
      if (num === "47") return incArrayValue(arr, "Ispad");
      if (num === "48") return incArrayValue(arr, "Isp. pod  rukom");
      if (num === "49") return incArrayValue(arr, "APU Neuspešno");
      if (num === "50") return incArrayValue(arr, "Smetnja");
      if (num === "79") return incArrayValue(arr, "Potencijalni kvar");
      if (num === "84") return incArrayValue(arr, "Konzum u mraku");
      if (num === "10") return incArrayValue(arr, "Traj. kvar");
      if (num === "9") return incArrayValue(arr, "Ostalo");
      if (num === "87") return incArrayValue(arr, "Prekid isporuke");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function IspadiPoVrstiDogPIChart({ dogadjaji }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, dogadjaji);
  const broj = dogadjaji.length;
  const hasDog = broj !== 0;

  // console.log(hasDog, broj);

  return hasDog ? (
    <ChartBox>
      <Heading as="h2">Испади/кварови по врсти догађаја</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
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
  ) : (
    <ChartBox>
      <Heading as="h2">Нема испада/кварова</Heading>
    </ChartBox>
  );
  // <ChartBox>
  //   <Heading as="h2">Испади/кварови по врсти догађаја</Heading>
  //   <ResponsiveContainer width="100%" height={240}>
  //     <PieChart>
  //       <Pie
  //         data={data}
  //         nameKey="duration"
  //         dataKey="value"
  //         innerRadius={70}
  //         outerRadius={100}
  //         cx="40%"
  //         cy="50%"
  //         paddingAngle={3}
  //       >
  //         {data.map((entry) => (
  //           <Cell
  //             fill={entry.color}
  //             stroke={entry.color}
  //             key={entry.duration}
  //           />
  //         ))}
  //       </Pie>
  //       <Tooltip />
  //       <Legend
  //         verticalAlign="middle"
  //         align="right"
  //         width="30%"
  //         layout="vertical"
  //         iconSize={15}
  //         iconType="circle"
  //       />
  //     </PieChart>
  //   </ResponsiveContainer>
  // </ChartBox>
}

IspadiPoVrstiDogPIChart.propTypes = {
  dogadjaji: PropTypes.arrayOf(
    PropTypes.shape({
      datizv: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default IspadiPoVrstiDogPIChart;
