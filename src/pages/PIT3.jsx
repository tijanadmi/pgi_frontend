import PIT3Table from "../features/PIT3/PIT3Table";
import DayT3TableOperation from "../features/dayT3/DayT3TableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function PIT3() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Погонски извештај - Дужи кварови</Heading>
        <DayT3TableOperation />
      </Row>

      <Row>
        <PIT3Table />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default PIT3;
