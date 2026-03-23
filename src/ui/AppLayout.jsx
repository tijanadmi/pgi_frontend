import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useState } from "react";

// const StyledAppLayout = styled.div`
//   display: grid;
//   // grid-template-columns: 26rem 1fr;
//   grid-template-columns: ${(props) =>
//     props.$collapsed ? "8rem 1fr" : "26rem 1fr"};
//   grid-template-rows: auto 1fr;
//   height: 100vh;
//   transition: grid-template-columns 0.25s ease;
// `;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-200);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 300rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <StyledAppLayout $collapsed={isCollapsed}>
      <Header  />
      <Sidebar
        collapsed={isCollapsed}
        // toggleSidebar={() => setIsCollapsed((s) => !s)}
        expandSidebar={() => setIsCollapsed(false)}
        collapseSidebar={() => setIsCollapsed(true)}
      />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;