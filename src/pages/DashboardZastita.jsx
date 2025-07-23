import DashboardLayout from "../features/dashboardZas/DashboardLayout";
import DashboardOperation from "../features/dashboardZas/DashboardOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function DashboardZastita() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Рад заштите</Heading>
        <DashboardOperation />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default DashboardZastita;
