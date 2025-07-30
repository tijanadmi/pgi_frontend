// import styled from "styled-components";
// import PropTypes from "prop-types";
// import DashboardBox from "./DashboardBox";
// import Heading from "../../ui/Heading";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   Legend,
// } from "recharts";
// import { useDarkMode } from "../../context/DarkModeContext";

// const StyledChart = styled(DashboardBox)`
//   grid-column: 1 / -1;

//   & .recharts-cartesian-grid-horizontal line,
//   & .recharts-cartesian-grid-vertical line {
//     stroke: var(--color-grey-300);
//   }
// `;

// function APUPoMesecimaChart({ dogadjaji, godina }) {
//   const { isDarkMode } = useDarkMode();

//   const colors = isDarkMode
//     ? {
//         text: "#e5e7eb",
//         background: "#18212f",
//         "400": "#facc15",
//         "220": "#4f46e5",
//         "110": "#10b981",
//       }
//     : {
//         text: "#374151",
//         background: "#fff",
//         "400": "#ca8a04",
//         "220": "#6366f1",
//         "110": "#059669",
//       };

//   // Grupisanje po mesecima i naponima
//   const meseci = [
//     "ЈАН", "ФЕБ", "МАР", "АПР", "МАЈ", "ЈУН",
//     "ЈУЛ", "АВГ", "СЕП", "ОКТ", "НОВ", "ДЕЦ",
//   ];

//   const data = meseci.map((mesec, index) => {
//     const mesecBr = (index + 1).toString();
//     const poNaponu = {
//       mesec,
//       "400": 0,
//       "220": 0,
//       "110": 0,
//     };

//     dogadjaji
//       .filter((d) => d.mesec_br === mesecBr)
//       .forEach((d) => {
//         const naponKey = d.napon.replace(" kV", ""); // "400", "220", "110"
//         poNaponu[naponKey] += parseInt(d.broj_apu);
//       });

//     return poNaponu;
//   });

//   return (
//     <StyledChart>
//       <Heading as="h2">Број АПУ успешно по месецима за {godina}</Heading>

//       <ResponsiveContainer height={300} width="100%">
//         <LineChart data={data}>
//           <XAxis
//             dataKey="mesec"
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <YAxis
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <CartesianGrid strokeDasharray="4" />
//           <Tooltip contentStyle={{ backgroundColor: colors.background }} />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="400"
//             stroke={colors["400"]}
//             strokeWidth={2}
//             name="400 kV"
//           />
//           <Line
//             type="monotone"
//             dataKey="220"
//             stroke={colors["220"]}
//             strokeWidth={2}
//             name="220 kV"
//           />
//           <Line
//             type="monotone"
//             dataKey="110"
//             stroke={colors["110"]}
//             strokeWidth={2}
//             name="110 kV"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </StyledChart>
//   );
// }

// APUPoMesecimaChart.propTypes = {
//   dogadjaji: PropTypes.arrayOf(
//     PropTypes.shape({
//       mesec_br: PropTypes.string.isRequired,
//       mesec: PropTypes.string.isRequired,
//       godina: PropTypes.string.isRequired,
//       napon: PropTypes.string.isRequired,
//       broj_apu: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default APUPoMesecimaChart;


import styled from "styled-components";
import PropTypes from "prop-types";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function APUPoMesecimaChart({ dogadjaji, godina }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        text: "#e5e7eb",
        background: "#18212f",
        "400": "#ef4444",        // crvena
        "220": "#10b981",        // zelena
        "110": "#3b82f6",        // plava
        // "400_n": "#f87171",      // svetlo crvena
        // "220_n": "#6ee7b7",      // svetlo zelena
        // "110_n": "#93c5fd",      // svetlo plava
      }
    : {
        text: "#374151",
        background: "#fff",
        "400": "#b91c1c",        // tamno crvena
        "220": "#065f46",        // tamno zelena
        "110": "#1d4ed8",        // tamno plava
        // "400_n": "#fca5a5",      // svetlo crvena
        // "220_n": "#a7f3d0",      // svetlo zelena
        // "110_n": "#bfdbfe",      // svetlo plava
      };

  const meseci = [
    "Јануар", "Фебруар", "Март", "Април", "Мај", "Јун",
    "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"
  ];

  const data = meseci.map((mesec, index) => {
    const mesecBr = index + 1;
    const poNaponu = {
      mesec,
      "400": 0,
      "220": 0,
      "110": 0,
      // "400_n": 0,
      // "220_n": 0,
      // "110_n": 0,
    };

    dogadjaji
      .filter((d) => d.mesec_br === mesecBr)
      .forEach((d) => {
        const naponKey = d.napon.toString(); // npr "400"
        poNaponu[naponKey] += d.broj_apu;
        // poNaponu[`${naponKey}_n`] += d.broj_apu_n;
      });

    return poNaponu;
  });

  return (
    <StyledChart>
      <Heading as="h2">Број АПУ успешно по месецима за {godina}</Heading>

      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="mesec"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            allowDecimals={false}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend />

          {/* Uspešni APU */}
          <Line type="monotone" dataKey="400" stroke={colors["400"]} strokeWidth={2} name="400 kV АПУ успешно" />
          <Line type="monotone" dataKey="220" stroke={colors["220"]} strokeWidth={2} name="220 kV АПУ успешно" />
          <Line type="monotone" dataKey="110" stroke={colors["110"]} strokeWidth={2} name="110 kV АПУ успешно" />

          {/* Neuspešni APU */}
          {/* <Line type="monotone" dataKey="400_n" stroke={colors["400_n"]} strokeWidth={1.5} strokeDasharray="5 5" name="400 kV АПУ неуспешно" />
          <Line type="monotone" dataKey="220_n" stroke={colors["220_n"]} strokeWidth={1.5} strokeDasharray="5 5" name="220 kV АПУ неуспешно" />
          <Line type="monotone" dataKey="110_n" stroke={colors["110_n"]} strokeWidth={1.5} strokeDasharray="5 5" name="110 kV АПУ неуспешно" /> */}
        </LineChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}

APUPoMesecimaChart.propTypes = {
  dogadjaji: PropTypes.arrayOf(
    PropTypes.shape({
      mesec_br: PropTypes.number.isRequired,
      mesec: PropTypes.string.isRequired,
      godina: PropTypes.number.isRequired,
      napon: PropTypes.number.isRequired,
      broj_apu: PropTypes.number.isRequired,
      broj_apu_n: PropTypes.number.isRequired,
    })
  ).isRequired,
  godina: PropTypes.number.isRequired,
};

export default APUPoMesecimaChart;
