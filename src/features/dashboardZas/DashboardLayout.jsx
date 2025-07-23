import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import APUPoMesecimaChart from "./APUPoMesecimaChart";
// import ApuChart from "./ApuChart";
// import IspadiPoVrstiDogChart from "./IspadiPoVrstiDogChart";
import { useRadApuMesForYear } from "./useRadApuMesForYear";
// import TodayActivity from "../check-in-out/TodayActivity";

// import { useRooms } from "../rooms/useRooms";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  // const { reservations, isLoading: isLoading1 } = useRecentBookings();
  const {
    dogadjaji,
    isLoading: isLoading,
    year,
  } = useRadApuMesForYear();
  // console.log(dogadjaji)
  if (isLoading ) return <Spinner />;
  
  return (
    <StyledDashboardLayout>
      {/* <ApuChart data={dogadjaji} /> */}
      {/* <IspadiPoVrstiDogChart dogadjaji={dogadjaji} /> */}
      <APUPoMesecimaChart dogadjaji={dogadjaji} godina={year} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
