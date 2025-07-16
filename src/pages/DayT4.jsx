import DayT4Table from "../features/dayT4/DayT4Table";
import DayT4TableOperations from "../features/dayT4/DayT4TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function DayT4() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Дневни извештај - Проблематика погона мреже</Heading>
        <DayT4TableOperations />
      </Row>

      <Row>
        <DayT4Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default DayT4;
