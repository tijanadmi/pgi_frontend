import DayCard from "./DayCard.jsx";
import { useListClosedShiftsByPeriod } from "./useListClosedShiftsByPeriod";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function DDNClosedShiftsLayout() {
  const { closedShifts, isLoading, count } = useListClosedShiftsByPeriod();

  // console.log("closedShifts iz DDNClosedShiftsLayout", closedShifts);

  if (isLoading) return <Spinner />;
  if (!closedShifts.length) return <Empty resourceName="затворена смена" />;

  return (
    <>
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      {closedShifts.map((shift) => (
        <DayCard key={shift.id_smene} shiftData={shift} />
      ))}
    </div>
    <Pagination count={count} />
    </>
  );
}

export default DDNClosedShiftsLayout;