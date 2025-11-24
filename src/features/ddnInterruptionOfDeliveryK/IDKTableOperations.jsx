import MrcSelect from "../lovs/MrcSelect";
// import YearSelect from "../../ui/YearSelect";
// import MonthSelect from "../../ui/MonthSelect";
import RangeDateSelect from "../../ui/RangeDateSelect";
import TableOperations from "../../ui/TableOperations";

function IDKTableOperation() {
  return (
    <>
      <TableOperations>
        <MrcSelect />

        {/* <MonthSelect />
        <YearSelect></YearSelect> */}
        <RangeDateSelect initialInterval={30}  />

      </TableOperations>
    </>
  );
}

export default IDKTableOperation;
