import DayT2Table from "../features/dayT2/DayT2Table";
import DayT2TableOperations from "../features/dayT2/DayT2TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function DayT2() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Дневни извештај - Искључења и укључења</Heading>
        <DayT2TableOperations />
      </Row>

      <Row>
        <DayT2Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default DayT2;
