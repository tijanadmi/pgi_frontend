import PIT1Table from "../features/PIT1/PIT1Table";
import DayT1TableOperations from "../features/dayT1/DayT1TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function PIT1() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Погонски извештај - Испади и кварови</Heading>
        <DayT1TableOperations />
      </Row>

      <Row>
        <PIT1Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default PIT1;
