
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DDNClosedShiftsLayout from "../features/dashboardDDN/DDNClosedShiftsLayout";
import DDNShiftsOperations from "../features/dashboardDDN/DDNShiftsOperations";

function DDNClosedShifts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Затворене смене</Heading>
         <DDNShiftsOperations />
      </Row>
      <DDNClosedShiftsLayout />
      
    </>
  );
}

export default DDNClosedShifts;