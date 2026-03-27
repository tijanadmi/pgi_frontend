import { NavLink } from "react-router-dom";

import NavItem from "./NavItem";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

import { 
  MdEventNote,
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

  width: ${(props) => (props.$collapsed ? "5rem" : "100%")};
`;





const SubMenuItem = styled(NavLink)`
  padding: 0.6rem 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  border-radius: var(--border-radius-sm);
  text-decoration: none;

  &:hover {
    background: var(--color-grey-100);
  }

  &.active {
    background: var(--color-grey-200);
    font-weight: 500;
  }
`;


function MainNav({ collapsed }) {
  return (
    <nav>

      <NavList>
        <NavItem
          icon={<MdEventNote />}
          label="Диспечерски дневник"
          to="#"
          collapsed={collapsed}
        >
          <SubMenuItem to="/ddnopenshifts">
            Отворене смене
          </SubMenuItem>

          <SubMenuItem to="/ddnclosedshifts">
            Затворене смене
          </SubMenuItem>
        </NavItem>
        <NavItem
          icon={<MdCalendarMonth />}
          label="Месечни извештаји"
          to="/dashboard"
          collapsed={collapsed}
        />

        <NavItem
          icon={<MdToday />}
          label="Дневни извештаји"
          to="/dashboardday"
          collapsed={collapsed}
        />

        <NavItem
          icon={<MdSyncProblem />}
          label="Погонски извештаји"
          to="/dashboardpogonski"
          collapsed={collapsed}
        />
          

        <NavItem
          icon={<FaUserSlash />}
          label="Прекиди корисника"
          to="/prekidk"
          collapsed={collapsed}
        />

        <NavItem
          icon={<MdPowerOff />}
          label="Прекиди производње"
          to="/prekidip"
          collapsed={collapsed}
        />

        <NavItem
          icon={<MdSecurity />}
          label="Рад заштите"
          to="/dashboardzastita"
          collapsed={collapsed}
        />
      </NavList>
    </nav>
  );
}

export default MainNav;
