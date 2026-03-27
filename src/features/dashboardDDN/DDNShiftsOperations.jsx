import MrcSelect from "../lovs/MrcSelect";
// import YearSelect from "../../ui/YearSelect";
// import MonthSelect from "../../ui/MonthSelect";
import RangeDateSelect from "../../ui/RangeDateSelect";
import TableOperations from "../../ui/TableOperations";

function DDNShiftsOperations() {
  return (
    <>
      <TableOperations>
        <MrcSelect />

        <RangeDateSelect initialInterval={30}  />

      </TableOperations>
    </>
  );
}

export default DDNShiftsOperations;