


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

function APUNeuspesnoPoMesecimaChart({ dogadjaji, godina }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        text: "#e5e7eb",
        background: "#18212f",
        // "400": "#ef4444",        // crvena
        // "220": "#10b981",        // zelena
        // "110": "#3b82f6",        // plava
        "400_n": "#f77070ff",      // svetlo crvena
        "220_n": "#69f1b2ff",      // svetlo zelena
        "110_n": "#7ab2f7ff",      // svetlo plava
      }
    : {
        text: "#374151",
        background: "#fff",
        // "400": "#b91c1c",        // tamno crvena
        // "220": "#065f46",        // tamno zelena
        // "110": "#1d4ed8",        // tamno plava
        "400_n": "#f77070ff",      // svetlo crvena
        "220_n": "#69f1b2ff",      // svetlo zelena
        "110_n": "#7ab2f7ff",      // svetlo plava
      };

  const meseci = [
    "Јануар", "Фебруар", "Март", "Април", "Мај", "Јун",
    "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"
  ];

  const data = meseci.map((mesec, index) => {
    const mesecBr = index + 1;
    const poNaponu = {
      mesec,
      // "400": 0,
      // "220": 0,
      // "110": 0,
      "400_n": 0,
      "220_n": 0,
      "110_n": 0,
    };

    dogadjaji
      .filter((d) => d.mesec_br === mesecBr)
      .forEach((d) => {
        const naponKey = d.napon.toString(); // npr "400"
        // poNaponu[naponKey] += d.broj_apu;
        poNaponu[`${naponKey}_n`] += d.broj_apu_n;
      });

    return poNaponu;
  });

  return (
    <StyledChart>
      <Heading as="h2">Број АПУ неуспешно по месецима за {godina}</Heading>

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
          {/* <Line type="monotone" dataKey="400" stroke={colors["400"]} strokeWidth={2} name="400 kV АПУ успешно" />
          <Line type="monotone" dataKey="220" stroke={colors["220"]} strokeWidth={2} name="220 kV АПУ успешно" />
          <Line type="monotone" dataKey="110" stroke={colors["110"]} strokeWidth={2} name="110 kV АПУ успешно" /> */}

          {/* Neuspešni APU */}
          <Line type="monotone" dataKey="400_n" stroke={colors["400_n"]} strokeWidth={2}  name="400 kV АПУ неуспешно" />
          <Line type="monotone" dataKey="220_n" stroke={colors["220_n"]} strokeWidth={2}  name="220 kV АПУ неуспешно" />
          <Line type="monotone" dataKey="110_n" stroke={colors["110_n"]} strokeWidth={2}  name="110 kV АПУ неуспешно" />
        </LineChart>
      </ResponsiveContainer>
    </StyledChart>
  );
}

APUNeuspesnoPoMesecimaChart.propTypes = {
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

export default APUNeuspesnoPoMesecimaChart;
