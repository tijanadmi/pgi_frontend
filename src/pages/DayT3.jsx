import DayT3Table from "../features/dayT3/DayT3Table";
import DayT3TableOperation from "../features/dayT3/DayT3TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function DayT3() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Дневни извештај - Дужи кварови</Heading>
        <DayT3TableOperation />
      </Row>

      <Row>
        <DayT3Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default DayT3;
