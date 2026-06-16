


import styled from "styled-components";
import Modal from "../../ui/Modal";
import Iskljucenje from "./Iskljucenje";
import ObavestenjeBeleska from "./ObavestenjeBeleska";  
import RadTK from "./RadTK"; // Import za RadTK komponentu
import RadTSU from "./RadTSU";
import RadSOP from "./RadSOP";
import Ispad from "./Ispad";
import PrekidP from "./PrekidP";
import ObavestenjeSlike from "./ObavestenjeSlike";
import AngazovaniRukovaoci from "./AngazovaniRukovaoci"; 

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
  const isIspad = tip === "1" || tip === 1 || tip === 7 || tip === "7";
  const isBeleska = tip === "O" && tip_obav=== "B";
  const isSlika = tip === "O" && tip_obav=== "F";
  const isRadTSU = tip === "5" || tip === 5; 
  const isRadSOP = tip === "A"; 
  const isRadTK = tip === "6" || tip === 6; 
  const isPrekidP = tip === "P"; 
  const isAngazovaniRuk = tip === "D";
//   console.log("isBeleska =", isBeleska, "tip =", tip, "tip_obav =", tip_obav);

// console.log("Iskljucenje:", tip, isIspad, isIskljucenje,isPrekidP);
// console.log("ObavestenjeBeleska:", ObavestenjeBeleska);

  let content = null;

  if (isIskljucenje) {
    content = <Iskljucenje dogId={id} />;
  } else if (isBeleska) {
    content = <ObavestenjeBeleska dogId={id} />;
  } else if (isRadSOP) {
    content = <RadSOP dogId={id} />;
  } else if (isRadTK) {
    content = <RadTK dogId={id} />;
  } else if (isRadTSU) {
    content = <RadTSU dogId={id} />;
  } else if (isIspad) {
    content = <Ispad dogId={id} />;
  } else if (isPrekidP) {
    content = <PrekidP dogId={id} />;
  } else if (isSlika) {
    content = <ObavestenjeSlike dogId={id} />;
  } else if (isAngazovaniRuk) {
    content = <AngazovaniRukovaoci dogId={id} />;
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

      <Modal.Window 
        name={`event-${id}`}
        fullscreen={isSlika}
      >
        {content}
      </Modal.Window>
    </Modal>
  );
}

export default EventItem;