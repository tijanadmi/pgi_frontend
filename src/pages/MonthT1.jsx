import MonthT1Table from "../features/monthT1/MonthT1Table";
import MonthT1TableOperations from "../features/monthT1/MonthT1TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function MonthT1() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Месечни извештај - Испади и кварови</Heading>
        <MonthT1TableOperations />
      </Row>

      <Row>
        <MonthT1Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default MonthT1;
