

import DayCard from "./DayCard.jsx";
import { useOpenShifts } from "./useOpenShifts";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

function DashboardDDNLayout() {
  const { isLoading, openShifts } = useOpenShifts();

  // console.log("openShifts iz DashboardDDNLayout", openShifts);

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