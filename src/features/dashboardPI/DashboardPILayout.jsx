import styled from "styled-components";
import { useT1ForDayPI } from "./useT1ForDayPI";
import { useT2ForDayPI } from "./useT2ForDayPI";
import { useT3ForDayPI } from "./useT3ForDayPI";
import { useT4ForDayPI } from "./useT4ForDayPI";
// import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
// import IspadiPoDanimaChart from "./IspadiPoDanimaChart";
import IspadiPoVrstiDogPIChart from "./IspadiPoVrstiDogPIChart";
import PIActivity from "./PIActivity";
// import TodayActivity from "../check-in-out/TodayActivity";

// import { useRooms } from "../rooms/useRooms";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardPILayout() {
  // const { reservations, isLoading: isLoading1 } = useRecentBookings();
  const {
    dogadjaji,
    isLoading: isLoading2,
    day,
    mrcId,
    count: count1,
  } = useT1ForDayPI();
  const { isLoading: isLoading3, count: count2 } = useT2ForDayPI();
  const { isLoading: isLoading4, count: count3 } = useT3ForDayPI();
  const { isLoading: isLoading5, count: count4 } = useT4ForDayPI();
  // const { rooms, isLoading: isLoading3 } = useRooms();
  // console.log("Dogadjaji u DashboardLayout:", dogadjaji);
  // if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  if (isLoading2 || isLoading3 || isLoading4 || isLoading5) return <Spinner />;
  // if (isLoading1 || isLoading2) return <Spinner />;

  // console.log(confirmedStays);
  return (
    <StyledDashboardLayout>
      <Stats t1={count1} t2={count2} t3={count3} t4={count4} />
      {/* <TodayActivity /> */}
      <PIActivity
        t1={count1}
        t2={count2}
        t3={count3}
        t4={count4}
        day={day}
        mrcId={mrcId}
      />
      <IspadiPoVrstiDogPIChart dogadjaji={dogadjaji} />
      {/* <IspadiPoDanimaChart dogadjaji={dogadjaji} year={year} month={month} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardPILayout;
