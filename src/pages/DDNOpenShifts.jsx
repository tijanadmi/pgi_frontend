
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardDDNLayout from "../features/dashboardDDN/DashboardDDNLayout";

function DDNOpenShifts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Отворене смене</Heading>
         
      </Row>
      <DashboardDDNLayout />
      
    </>
  );
}

export default DDNOpenShifts;