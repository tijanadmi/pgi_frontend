import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const StyledDateInput = styled.input`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$variant === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

/* POMOĆNE FUNKCIJE */
/** dd.mm.yyyy -> yyyy-mm-dd */
function dotToIso(dot) {
  if (!dot) return "";
  const parts = dot.split(".");
  if (parts.length !== 3) return "";
  const [dd, mm, yyyy] = parts;
  return `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
}

/** yyyy-mm-dd -> dd.mm.yyyy */
function isoToDot(iso) {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length !== 3) return "";
  const [yyyy, mm, dd] = parts;
  return `${String(dd).padStart(2, "0")}.${String(mm).padStart(2, "0")}.${yyyy}`;
}

/** dd.mm.yyyy -> input value yyyy-mm-dd */
function dotToInputValue(dot) {
  return dotToIso(dot);
}

/** input value yyyy-mm-dd -> dd.mm.yyyy */
function inputValueToDot(inputVal) {
  return isoToDot(inputVal);
}

function RangeDateSelect({ variant = "white", initialInterval = null }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- izračun default last (today) i default first (today - interval || juče) u ISO (yyyy-mm-dd)
  const today = new Date();
  const isoToday = today.toISOString().split("T")[0];

  const defaultLastIso = (() => {
    const lastParam = searchParams.get("last_day");
    if (lastParam) return dotToIso(lastParam);
    return isoToday;
  })();

  const defaultFirstIso = (() => {
    const firstParam = searchParams.get("first_day");
    if (firstParam) return dotToIso(firstParam);

    if (typeof initialInterval === "number" && initialInterval >= 0) {
      const d = new Date(today);
      d.setDate(d.getDate() - initialInterval);
      return d.toISOString().split("T")[0];
    }

    // original fallback = juče
    const y = new Date(today);
    y.setDate(y.getDate() - 1);
    return y.toISOString().split("T")[0];
  })();

  // --- pri prvom mount-u: ako nema searchParams, upiši inicijalne vrednosti u URL
  useEffect(() => {
    let changed = false;

    if (!searchParams.get("first_day")) {
      searchParams.set("first_day", isoToDot(defaultFirstIso));
      changed = true;
    }
    if (!searchParams.get("last_day")) {
      searchParams.set("last_day", isoToDot(defaultLastIso));
      changed = true;
    }

    // Ako je first > last (teoretski ne bi trebalo), poravnaj last = first
    const curFirst = searchParams.get("first_day");
    const curLast = searchParams.get("last_day");
    if (curFirst && curLast) {
      const firstIso = dotToIso(curFirst);
      const lastIso = dotToIso(curLast);
      if (new Date(firstIso) > new Date(lastIso)) {
        searchParams.set("last_day", curFirst);
        changed = true;
      }
    }

    if (changed) {
      // setSearchParams će uzrokovati re-render ali samo jednom (jer od sada parametri postoje)
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // samo jednom pri mount-u

  // vrednosti za input polja (kontrolisani input)
  const firstInputValue = defaultFirstIso; // yyyy-mm-dd
  const lastInputValue = defaultLastIso; // yyyy-mm-dd

  function handleFirstChange(e) {
    const newIso = e.target.value; // yyyy-mm-dd
    const newDot = isoToDot(newIso);
    searchParams.set("first_day", newDot);

    // Ako je poslednji datum manji od novog first -> poravnaj last = first
    const existingLastDot = searchParams.get("last_day");
    if (existingLastDot) {
      const existingLastIso = dotToIso(existingLastDot);
      if (new Date(existingLastIso) < new Date(newIso)) {
        searchParams.set("last_day", newDot);
      }
    }

    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handleLastChange(e) {
    const newIso = e.target.value; // yyyy-mm-dd
    const newDot = isoToDot(newIso);
    searchParams.set("last_day", newDot);

    // Ako je first param nije postavljen (bezbednosna provera), postavi ga na newDot - initialInterval ili newDot
    if (!searchParams.get("first_day")) {
      // ako imamo initialInterval, pokušaj da postavimo first = last - interval
      if (typeof initialInterval === "number" && initialInterval >= 0) {
        const d = new Date(newIso);
        d.setDate(d.getDate() - initialInterval);
        searchParams.set("first_day", isoToDot(d.toISOString().split("T")[0]));
      } else {
        // inače poravnaj first sa last (sigurnosna mera)
        searchParams.set("first_day", newDot);
      }
    }

    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <Wrapper>
      <StyledDateInput
        type="date"
        value={firstInputValue}
        onChange={handleFirstChange}
        onKeyDown={(e) => e.preventDefault()}
        max={lastInputValue}
        $variant={variant}
      />

      <span>—</span>

      <StyledDateInput
        type="date"
        value={lastInputValue}
        onChange={handleLastChange}
        onKeyDown={(e) => e.preventDefault()}
        min={firstInputValue}
        $variant={variant}
      />
    </Wrapper>
  );
}

RangeDateSelect.propTypes = {
  variant: PropTypes.string,
  initialInterval: PropTypes.number, // npr. 30
};

export default RangeDateSelect;
