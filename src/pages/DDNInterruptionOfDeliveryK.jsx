import AddIntOfDeliveryK from "../features/ddnInterruptionOfDeliveryK/AddIntOfDeliveryK";
import IDKTable from "../features/ddnInterruptionOfDeliveryK/IDKTable";
import IDKTableOperations from "../features/ddnInterruptionOfDeliveryK/IDKTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddRestriction from "../features/restrictions/AddRestriction";

import { useRole } from "../features/authentication/useRole";


function DDNInterruptionOfDeliveryK() {
  const { isBI, isLoading } = useRole();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Прекиди корисника</Heading>
        <IDKTableOperations />
      </Row>

      <Row>
        {isBI && <AddIntOfDeliveryK />}
      </Row>

      <Row>
        <IDKTable />
      </Row>
    </>
  );
}

export default DDNInterruptionOfDeliveryK;
