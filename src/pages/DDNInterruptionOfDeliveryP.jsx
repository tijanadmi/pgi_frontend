import IDPTable from "../features/ddnInterruptionOfDeliveryP/IDPTable";
import IDPTableOperations from "../features/ddnInterruptionOfDeliveryP/IDPTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddIntOfDeliveryP from "../features/ddnInterruptionOfDeliveryP/AddIntOfDeliveryP";
// import AddRestriction from "../features/restrictions/AddRestriction";

function DDNInterruptionOfDeliveryP() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Прекиди производње</Heading>
        <IDPTableOperations />
      </Row>

      <Row>
        <AddIntOfDeliveryP />
      </Row>
      <Row>
        {/* <AddIntOfDeliveryP /> */}
        
        <IDPTable />
        {/* <AddRestriction />     */}
      </Row>
    </>
  );
}

export default DDNInterruptionOfDeliveryP;
