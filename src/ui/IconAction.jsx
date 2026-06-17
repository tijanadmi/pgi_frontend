import styled from "styled-components";
import { useState } from "react";
import { createPortal } from "react-dom";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.div`
  position: fixed;
  z-index: 9999;

  background: var(--color-tooltip-bg);
  color: var(--color-tooltip-text);

  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  font-size: 1.1rem;
  white-space: nowrap;

  box-shadow: var(--shadow-sm);
  transform: translate(-50%, -120%);
`;

function IconAction({ icon, tooltip }) {
  const [coords, setCoords] = useState(null);

  function handleEnter(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  function handleLeave() {
    setCoords(null);
  }

  return (
    <>
      <Button onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {icon}
      </Button>

      {coords &&
        createPortal(
          <Tooltip
            style={{
              left: coords.x,
              top: coords.y,
            }}
          >
            {tooltip}
          </Tooltip>,
          document.body
        )}
    </>
  );
}

export default IconAction;