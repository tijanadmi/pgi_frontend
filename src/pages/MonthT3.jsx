import MonthT3Table from "../features/monthT3/MonthT3Table";
import MonthT3TableOperations from "../features/monthT3/MonthT3TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function MonthT3() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Месечни извештај - Дужи кварови</Heading>
        <MonthT3TableOperations />
      </Row>

      <Row>
        <MonthT3Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default MonthT3;
