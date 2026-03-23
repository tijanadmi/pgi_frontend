// import DayCard from "./DayCard.jsx";

// import { useOpenShifts } from "./useOpenShifts";

// import Empty from "../../ui/Empty";
// import Spinner from "../../ui/Spinner";

// function DashboardDDNLayout() {
//   const { isLoading, openShifts } = useOpenShifts();

// if (isLoading) return <Spinner />;
// if (!openShifts.length) return <Empty resourceName="openShifts" />;

// console.log("openShifts", openShifts);
//   return (
//     <div style={{ display: "flex", gap: "2rem" }}>
//       <DayCard
//         date="05.12.2025."
//         shift="night"
//         workers={["RD", "RD", "RD"]}
//         count={0}
//       />

//       <DayCard
//         date="05.12.2025."
//         shift="day"
//         workers={["RD", "RD", "RD"]}
//         count={14}
//       />

//       <DayCard
//         date="04.12.2025."
//         shift="night"
//         workers={["RD", "RD", "RD", "RD"]}
//         count={1}
//       />
//     </div>
//   );
// }

// export default DashboardDDNLayout;

import DayCard from "./DayCard.jsx";
import { useOpenShifts } from "./useOpenShifts";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

function DashboardDDNLayout() {
  const { isLoading, openShifts } = useOpenShifts();

  console.log("openShifts iz DashboardDDNLayout", openShifts);

  if (isLoading) return <Spinner />;
  if (!openShifts.length) return <Empty resourceName="отворена смена" />;

  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {openShifts.map((shift) => (
        <DayCard key={shift.id_smene} shiftData={shift} />
      ))}
    </div>
  );
}

export default DashboardDDNLayout;