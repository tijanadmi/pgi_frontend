import DaySelect from "../../ui/DaySelect";
import MrcSelect from "../../features/lovs/MrcSelect";
import TableOperations from "../../ui/TableOperations";
// import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";

function DayT4TableOperation() {
  const moveBack = useMoveBack();

  return (
    <>
      <TableOperations>
        <MrcSelect />
        <DaySelect />
        {/* <ButtonText onClick={moveBack}>&larr; Изађи</ButtonText> */}
      </TableOperations>
    </>
  );
}

export default DayT4TableOperation;
