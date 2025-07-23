// import {
//   HiOutlineBanknotes,
//   HiOutlineBriefcase,
//   HiOutlineCalendarDays,
//   HiOutlineChartBar,
// } from "react-icons/hi2";

import {
  MdFlashOn,
  MdPowerSettingsNew,
  MdReportProblem,
  MdSyncProblem
} from "react-icons/md";

import PropTypes from "prop-types";
import Stat from "./Stat";
// import { formatCurrency } from "../../utils/helpers";

function Stats({ t1, t2, t3, t4 }) {
  // 1.
  const numT1 = t1;

  // 2.
  const numT2 = t2;

  // 3.
  const numT3 = t3;

  // 4.
  const numT4 = t4;

  return (
    <>
      <Stat
        title="Испади/кварови"
        color="blue"
        icon={<MdFlashOn />}
        value={numT1}
      />
      <Stat
        title="Искључења/укључења"
        color="green"
        icon={<MdPowerSettingsNew />}
        value={numT2}
      />
      <Stat
        title="Дужи кварови"
        color="indigo"
        icon={<MdReportProblem />}
        value={numT3}
      />
      <Stat
        title="Проблематика пог.мреже"
        color="yellow"
        icon={<MdSyncProblem />}
        value={numT4}
      />
    </>
  );
}

Stats.propTypes = {
  t1: PropTypes.array.isRequired,
  t2: PropTypes.array.isRequired,
  t3: PropTypes.array.isRequired,
  t4: PropTypes.array.isRequired,
};

export default Stats;
