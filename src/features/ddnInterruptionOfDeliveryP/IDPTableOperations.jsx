import MrcSelect from "../../features/lovs/MrcSelect";
// import YearSelect from "../../ui/YearSelect";
// import MonthSelect from "../../ui/MonthSelect";
import RangeDateSelect from "../../ui/RangeDateSelect";
import TableOperations from "../../ui/TableOperations";

function IDPTableOperation() {
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

export default IDPTableOperation;
