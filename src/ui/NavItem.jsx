import React, { useState } from "react"; 
import { useLocation, NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiChevronRight } from "react-icons/hi2";

const Tooltip = styled.span`
  position: absolute;
  left: 110%;
  top: 50%;
  transform: translateY(-50%);

  background: var(--color-tooltip-bg);
  color: var(--color-tooltip-text);

  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);

  white-space: nowrap;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
`;



const StyledNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:link,
  &:visited {
    display: flex;
    align-items: center;

    width: 100%;

    gap: ${(props) => (props.$collapsed ? "0" : "1.2rem")};
    justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};

    color: var(--color-sidebar-icon);
    font-size: ${(props) => (props.$collapsed ? "0" : "1.5rem")};
    font-weight: 500;

    padding: ${(props) =>
      props.$collapsed ? "1rem" : "1.2rem 2.4rem"};

    transition: all 0.2s ease;
  }

  &:hover ${Tooltip} {
    opacity: 1;
  }

&.active {
  background-color: var(--color-sidebar-hover);
}

&:hover {
  background-color: rgba(255,255,255,0.08);
}

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-sidebar-icon);
    flex-shrink: 0;

    transition: color 0.2s;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-sidebar-icon);
  }
`;

const Item = styled.li`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-right: 8px;

  &:hover > ul {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    }
`;



const SubMenu = styled.ul`
  position: absolute;
  left: 100%;
  top: 0;

  background: var(--color-submenu-bg);
  color: var(--color-submenu-text);

  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);

  padding: 0.8rem;

  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 16rem;

  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: all 0.2s;
`;

const SubMenuHeader = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-submenu-text);

  padding: 0.4rem 0.6rem;
  margin-bottom: 0.4rem;

  border-bottom: 1px solid var(--color-grey-300);
`;

function NavItem({ icon, label, to, collapsed, children }) {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const hasSubmenu = !!children;

  const isActive = to ? location.pathname === to : false;
  // ili, ako submeniji imaju to, možeš proveriti
  const isAnySubActive =
    children &&
    React.Children.toArray(children).some(
      (child) => child.props.href && location.pathname === child.props.href
    );

  function handleClick(e) {
    if (hasSubmenu) {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }

  return (
    // <Item>
    //   <StyledNavLink to={to || "#"} onClick={handleClick}>
    //     {icon}
    //     <Tooltip>{label}</Tooltip>
    //  </StyledNavLink>
    //  {hasSubmenu && 
    //  <SubMenu>
    //    <SubMenuHeader>{label}</SubMenuHeader>
    //    {children}
    //  </SubMenu>}
    // </Item>
    <Item className={isActive || isAnySubActive ? "active" : ""}>
  {/* {hasSubmenu ? (
    <StyledNavLink as="div" onClick={handleClick}>
      {icon}
      <Tooltip>{label}</Tooltip>
    </StyledNavLink>
  ) : (
    <StyledNavLink to={to}>
      {icon}
      <Tooltip>{label}</Tooltip>
    </StyledNavLink>
  )} */}

  {hasSubmenu ? (
        <div onClick={handleClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {icon}
          <Tooltip>{label}</Tooltip>
        </div>
      ) : (
        <StyledNavLink to={to} end>
          {icon}
          <Tooltip>{label}</Tooltip>
        </StyledNavLink>
      )}

  {hasSubmenu && (
    <SubMenu>
      <SubMenuHeader>{label}</SubMenuHeader>
      {children}
    </SubMenu>
  )}
</Item>
  );
}

export default NavItem;