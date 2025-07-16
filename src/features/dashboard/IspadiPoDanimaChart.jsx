import styled from "styled-components";
import PropTypes from "prop-types";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, parse } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function IspadiPoDanimaChart({ dogadjaji, year, month }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: new Date(year, month - 1, 1),
    end: new Date(year, month, 0),
  });
  // console.log(allDates);

  const data = allDates.map((date) => {
    return {
      label: format(date, "dd.MM"),
      brDog: dogadjaji.filter((dogadjaj) =>
        isSameDay(date, parse(dogadjaj.datizv, "dd.MM.yyyy", new Date()))
      ).length, // Umesto reduce()
      // .filter((dogadjaji) => isSameDay(date, new Date(dogadjaji.datizv)))
      // .reduce((acc, _) => acc + 1, 0),
    };
  });

  const colors = isDarkMode
    ? {
        brDog: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        brDog: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Испади/Кварови у периоду {format(allDates.at(0), "dd.MM.yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "dd.MM.yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          /> */}
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="brDog"
            type="monotone"
            stroke={colors.brDog.stroke}
            fill={colors.brDog.fill}
            strokeWidth={2}
            name="Број испада/кварова"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

IspadiPoDanimaChart.propTypes = {
  dogadjaji: PropTypes.arrayOf(
    PropTypes.shape({
      datizv: PropTypes.string.isRequired,
    })
  ).isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default IspadiPoDanimaChart;
