import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
// import Bookings from "./pages/Bookings";
// import Rooms from "./pages/Rooms";
// import Users from "./pages/Users";
import DDNInterruptionOfDeliveryK from "./pages/DDNInterruptionOfDeliveryK";
import DDNInterruptionOfDeliveryP from "./pages/DDNInterruptionOfDeliveryP";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

import { Toaster } from "react-hot-toast";
import MonthT1 from "./pages/MonthT1.jsx";
import MonthT2 from "./pages/MonthT2.jsx";
import MonthT3 from "./pages/MonthT3.jsx";
import MonthT4 from "./pages/MonthT4.jsx";

import DayT1 from "./pages/DayT1.jsx";
import DayT2 from "./pages/DayT2.jsx";
import DayT3 from "./pages/DayT3.jsx";
import DayT4 from "./pages/DayT4.jsx";

import PIT1 from "./pages/PIT1.jsx";
import PIT2 from "./pages/PIT2.jsx";
import PIT3 from "./pages/PIT3.jsx";
import PIT4 from "./pages/PIT4.jsx";

import DashboardDay from "./pages/DashboardDay.jsx";
import DashboardPI from "./pages/DashboardPI.jsx";
import DashboardZastita from "./pages/DashboardZastita.jsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboardday" element={<DashboardDay />} />
              <Route path="dashboardpogonski" element={<DashboardPI />} />
              <Route path="dashboardzastita" element={<DashboardZastita />} />
              <Route path="bookings/:reservationId" element={<Booking />} />
              <Route path="checkin/:reservationId" element={<Checkin />} />
              <Route path="mesecni/t1" element={<MonthT1 />} />
              <Route path="mesecni/t2" element={<MonthT2 />} />
              <Route path="mesecni/t3" element={<MonthT3 />} />
              <Route path="mesecni/t4" element={<MonthT4 />} />

              <Route path="dnevni/t1" element={<DayT1 />} />
              <Route path="dnevni/t2" element={<DayT2 />} />
              <Route path="dnevni/t3" element={<DayT3 />} />
              <Route path="dnevni/t4" element={<DayT4 />} />

              <Route path="pogonski/t1" element={<PIT1 />} />
              <Route path="pogonski/t2" element={<PIT2 />} />
              <Route path="pogonski/t3" element={<PIT3 />} />
              <Route path="pogonski/t4" element={<PIT4 />} />

              <Route path="prekidk" element={<DDNInterruptionOfDeliveryK />} />
              <Route path="prekidip" element={<DDNInterruptionOfDeliveryP />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
