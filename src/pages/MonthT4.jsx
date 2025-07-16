import MonthT4Table from "../features/monthT4/MonthT4Table";
import MonthT4TableOperations from "../features/monthT4/MonthT4TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function MonthT4() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Месечни извештај - Проблематика погона мреже</Heading>
        <MonthT4TableOperations />
      </Row>

      <Row>
        <MonthT4Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default MonthT4;
