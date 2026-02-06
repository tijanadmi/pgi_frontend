import IDPTable from "../features/ddnInterruptionOfDeliveryP/IDPTable";
import IDPTableOperations from "../features/ddnInterruptionOfDeliveryP/IDPTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddIntOfDeliveryP from "../features/ddnInterruptionOfDeliveryP/AddIntOfDeliveryP";
// import AddRestriction from "../features/restrictions/AddRestriction";

import { useRole } from "../features/authentication/useRole";

function DDNInterruptionOfDeliveryP() {
  const { isBI, isLoading } = useRole();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Прекиди производње</Heading>
        <IDPTableOperations />
      </Row>

      <Row>
        {isBI && <AddIntOfDeliveryP />}
      </Row>
      <Row>
        <IDPTable />
      </Row>
    </>
  );
}

export default DDNInterruptionOfDeliveryP;
