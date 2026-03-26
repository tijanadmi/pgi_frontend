


import styled from "styled-components";
import Modal from "../../ui/Modal";
import Iskljucenje from "./Iskljucenje";
import ObavestenjeBeleska from "./ObavestenjeBeleska";

const EventWrapper = styled.div`
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--color-grey-200);
  cursor: pointer;

  &:hover {
    background: var(--color-grey-100);
  }

  ${(props) =>
    props.$clickable &&
    `
    font-weight: 500;
    color: var(--color-blue-700);
  `}
`;

const Rb = styled.span`
  font-weight: 600;
  min-width: 2rem;
`;

const Naslov = styled.span`
  flex: 1;
`;

function EventItem({ id, rb, naslov, tip, tip_obav }) {
  const isIskljucenje = tip === "2" || tip === 2;
  const isBeleska = tip === "O" && tip_obav=== "B";
//   console.log("isBeleska =", isBeleska, "tip =", tip, "tip_obav =", tip_obav);

// console.log("Iskljucenje:", Iskljucenje);
// console.log("ObavestenjeBeleska:", ObavestenjeBeleska);

  let content = null;

  if (isIskljucenje) {
    content = <Iskljucenje dogId={id} />;
  } else if (isBeleska) {
    content = <ObavestenjeBeleska dogId={id} />;
  }

  // ako nema content → običan prikaz
  if (!content) {
    return (
      <EventWrapper $clickable={false}>
        <Rb>{rb}</Rb>
        <Naslov>{naslov}</Naslov>
      </EventWrapper>
    );
  }

  return (
    <Modal>
      <Modal.Open opens={`event-${id}`}>
        <EventWrapper $clickable={true}>
          <Rb>{rb}</Rb>
          <Naslov>{naslov}</Naslov>
        </EventWrapper>
      </Modal.Open>

      <Modal.Window name={`event-${id}`}>
        {content}
      </Modal.Window>
    </Modal>
  );
}

export default EventItem;