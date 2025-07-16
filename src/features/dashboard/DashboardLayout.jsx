import styled from "styled-components";
import { useT1ForMonth } from "./useT1ForMonth";
import { useT2ForMonth } from "./useT2ForMonth";
import { useT3ForMonth } from "./useT3ForMonth";
import { useT4ForMonth } from "./useT4ForMonth";
// import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import IspadiPoDanimaChart from "./IspadiPoDanimaChart";
import IspadiPoVrstiDogChart from "./IspadiPoVrstiDogChart";
import MMActivity from "./MMActivity";
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
    isLoading: isLoading2,
    month,
    year,
    count: count1,
  } = useT1ForMonth();
  const { isLoading: isLoading3, count: count2 } = useT2ForMonth();
  const { isLoading: isLoading4, count: count3 } = useT3ForMonth();
  const { isLoading: isLoading5, count: count4 } = useT4ForMonth();
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
      <MMActivity
        t1={count1}
        t2={count2}
        t3={count3}
        t4={count4}
        year={year}
        month={month}
      />
      <IspadiPoVrstiDogChart dogadjaji={dogadjaji} />
      <IspadiPoDanimaChart dogadjaji={dogadjaji} year={year} month={month} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
