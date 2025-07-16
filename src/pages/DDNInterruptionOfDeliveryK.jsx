import IDKTable from "../features/ddnInterruptionOfDeliveryK/IDKTable";
import IDKTableOperations from "../features/ddnInterruptionOfDeliveryK/IDKTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

function DDNInterruptionOfDeliveryK() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Прекиди корисника</Heading>
        <IDKTableOperations />
      </Row>

      <Row>
        <IDKTable />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default DDNInterruptionOfDeliveryK;
