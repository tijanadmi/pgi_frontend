import DayT1Table from "../features/dayT1/DayT1Table";
import DayT1TableOperations from "../features/dayT1/DayT1TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function DayT1() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Дневни извештај - Испади и кварови</Heading>
        <DayT1TableOperations />
      </Row>

      <Row>
        <DayT1Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default DayT1;
