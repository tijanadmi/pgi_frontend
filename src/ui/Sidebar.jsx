import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";



const StyledSidebar = styled.aside`
  

  background-color: var(--color-sidebar-bg);
  padding: 3.2rem 0.5rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  z-index: 100;
  position: relative;
  // justify-content: center;
align-items: center;
`;



// function Sidebar({ collapsed, toggleSidebar }) {
function Sidebar({ collapsed, expandSidebar, collapseSidebar }) {
  return (

     <StyledSidebar>
      <MainNav collapsed={collapsed}/>
    </StyledSidebar>
  );
}

export default Sidebar;