import PIT4Table from "../features/PIT4/PIT4Table";
import DayT4TableOperations from "../features/dayT4/DayT4TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function PIT4() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Погонски извештај - Проблематика погона мреже</Heading>
        <DayT4TableOperations />
      </Row>

      <Row>
        <PIT4Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default PIT4;
