import MonthT2Table from "../features/monthT2/MonthT2Table";
import MonthT2TableOperations from "../features/monthT2/MonthT2TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function MonthT2() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Месечни извештај - Укључења и искључења</Heading>
        <MonthT2TableOperations />
      </Row>

      <Row>
        <MonthT2Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default MonthT2;
