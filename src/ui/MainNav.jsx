import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

import { 
  MdCalendarMonth,
  MdToday,
  MdSyncProblem,
  MdPowerOff,
  MdSecurity
 } from "react-icons/md";

import { FaUserSlash } from "react-icons/fa";


const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <MdCalendarMonth />
            <span>Месечни извештаји</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/dashboardday">
            <MdToday />
            <span>Дневни извештаји</span>
          </StyledNavLink>
        </li>
         <li>
          <StyledNavLink to="/dashboardpogonski">
            <MdSyncProblem />
            <span>Погонски извештаји</span>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/mesecni/t1">
            <HiOutlineHomeModern />
            <span>Месечни извештаји</span>
          </StyledNavLink>
        </li> */}
        <li>
          <StyledNavLink to="/prekidk">
            <FaUserSlash />
            <span>Прекиди корисника</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/prekidip">
            <MdPowerOff />
            <span>Прекиди производње</span>
          </StyledNavLink>
        </li>
         <li>
          <StyledNavLink to="/dashboardzastita">
            <MdSecurity />
            <span>Рад заштите</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
