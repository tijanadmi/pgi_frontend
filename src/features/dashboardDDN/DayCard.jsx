import styled, { css } from "styled-components";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdSunny, MdNightlight } from "react-icons/md";
import { useState } from "react";
import EventItem from "./EventItem";

const Card = styled.div`
  width: 32.5rem;
  border-radius: 12px;
  background: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;


const Header = styled.div`
  padding: 1rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 500;

  ${(props) =>
    props.$isDay
      ? css`
          background: white;
          color: var(--color-grey-800);
          border-bottom: 1px solid var(--color-grey-200);
        `
      : css`
          background: #0f2a44;
          color: white;
        `}
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const HeaderBottom = styled.div`
  font-size: 1.5rem;
  opacity: 0.9;

  strong {
    font-weight: 600;
  }
`;

const Body = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: var(--color-blue-100);
  color: var(--color-blue-700);

  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-size: 1.2rem;
`;

const Count = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Footer = styled.div`
  border-top: 1px solid var(--color-grey-200);
  padding: 0.8rem 1.2rem;

  display: flex;
  justify-content: space-between;
`;


const IconGroup = styled.div`
  display: flex;
  gap: 0.8rem;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-600);
    cursor: pointer;
  }
`;

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sr-RS");
}

function groupByType(dogadjaji) {
  const map = {};

  dogadjaji.forEach((d) => {
    const key = d.tip_dog_cir
 || "Остало";

    // if (!map[key]) map[key] = 0;
    // map[key]++;
    if (!map[key]) map[key] = [];
    map[key].push(d);
  });

  return map;
}

function DayCard({ shiftData }) {
  const {
    dat_dnev,
    id_tip_smena,
    int_smena,
    rdc,
    dez_disp1_ime,
    dez_disp2_ime,
    dez_disp3_ime,
    dez_disp4_ime,
      tip_cir,
    dogadjaji = [],
  } = shiftData;

  const isDay = id_tip_smena === 1;

  const workers = [
    dez_disp1_ime,
    dez_disp2_ime,
    dez_disp3_ime,
    dez_disp4_ime,
  ].filter((w) => w && w.trim() !== "");

  const grouped = groupByType(dogadjaji);

  const [openTypes, setOpenTypes] = useState({});

  function toggleType(type) {
  setOpenTypes((prev) => ({
    ...prev,
    [type]: !prev[type],
  }));
}

  return (
    <Card>
      <Header $isDay={isDay}>
        <HeaderLeft>
          <HeaderTop>
            <HiOutlineUserGroup />
            <span>{formatDate(dat_dnev)} ({int_smena})</span>
          </HeaderTop>

          <HeaderBottom>
             <strong>{rdc}</strong>
          </HeaderBottom>
        </HeaderLeft>

        {isDay ? <MdSunny /> : <MdNightlight />}
      </Header>

      <Body>
        <div>Дежурни:</div>

        <Row>
          {workers.map((w, i) => (
            <Badge key={i}>{w}</Badge>
          ))}
        </Row>

        <div>Догађаји:</div>

        {Object.keys(grouped).length === 0 ? (
          <div>Нема догађаја</div>
        ) : (

Object.entries(grouped).map(([tip, lista]) => {
  const isOpen = openTypes[tip];

  return (
    <div key={tip}>
      <Count
        style={{ cursor: "pointer", display: "flex", gap: "0.5rem" }}
        onClick={() => toggleType(tip)}
      >
        <span style={{ transition: "0.2s" }}>
          {isOpen ? "🔽" : "▶️"}
        </span>
        {tip}: {lista.length}
      </Count>

      {isOpen && (
        <div style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {lista.map((d) => (
            <EventItem key={d.id} id={d.id} rb={d.rb_dog} naslov={d.naslov} tip={d.tip} tip_obav={d.tip_obav} />
        ))}
        </div>
      )}
    </div>
  );
})
        )}
      </Body>

      <Footer>
        <IconGroup>
          {/* <span>⟳</span>
          <span>📊</span> */}
          <span>🧾</span>
          {/* <span>↔</span>
          <span>🖨</span> */}
        </IconGroup>
      </Footer>
    </Card>
  );
}

export default DayCard;