import PIT2Table from "../features/PIT2/PIT2Table";
import DayT2TableOperations from "../features/dayT2/DayT2TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function PIT2() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Погонски извештај - Искључења и укључења</Heading>
        <DayT2TableOperations />
      </Row>

      <Row>
        <PIT2Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default PIT2;
