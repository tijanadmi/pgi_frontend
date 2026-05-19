import { useGetIspad } from "./useGetIspad";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
// import { useGetIspad } from "./useGetIspad";

function Ispad({ dogId }) {

  const { isLoading, ispad } = useGetIspad(dogId);

  console.log("Dohvaćen Ispad:", ispad);

  if (isLoading) return <Spinner />;
//   if (error) return <div>Greška: {error.message}</div>;
  if (!ispad) return <Empty resourceName="догађај" />;

  const {
    rb_dog,
    naslov,
    podnaslov,
    uzrok_tekst,
    man_tekst,
    posledice,
    detaljT567 = [],
    objekti ,
  } = ispad;

  const objektiSafe = objekti ?? [];

  return (
     <div style={{ marginBottom: "0.5rem" }}>
      <h2>{rb_dog} - {naslov}</h2>
      {podnaslov && <h3>{podnaslov}</h3>}

      <div
      style={{
        maxHeight: "75vh",
        overflowY: "auto",
        paddingRight: "0.5rem", // da ne seče tekst zbog scroll-a
      }}
    >

      {/* ===================== 1. UZROK ===================== */}
      <h3 style={{ marginTop: "1.5rem" }}>
        UZROK POREMEĆAJA I HRONOLOGIJA
      </h3>

      {detaljT567.length > 0 && (
  <div style={{ marginTop: "1rem" }}>
    {detaljT567.map((d, index) => (
      <div
        key={index}
        style={{
          display: "grid",
          gridTemplateColumns: "50px 1fr",
          gap: "0.6rem",
          alignItems: "start",
          fontSize: "1.2rem",
          lineHeight: "1.4",
          borderBottom: "1px solid var(--color-grey-200)",
          padding: "0.4rem 0",
        }}
      >
        {/* Dopuna */}
        <div
          style={{
            color: "var(--color-blue-700)",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          {d.dopuna_da_ne || ""}
        </div>

        {/* Tekstualni deo */}
        <div>
          <div style={{ fontWeight: 500 }}>{d.recenica1}</div>

          <div style={{ color: "var(--color-grey-600)" }}>
            {d.recenica2}
          </div>

          {d.opis && (
            <div
                style={{
                    color: "var(--color-grey-700)",
                    whiteSpace: "pre-line",   // 👈 KLJUČNO
                }}
            >
                {d.opis}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)}

     <hr style={{ margin: "1.5rem 0 1rem 0" }} />

      {uzrok_tekst && <p> {uzrok_tekst}</p>}
      {uzrok_tekst &&<hr style={{ margin: "1.5rem 0 1rem 0" }} />}

      {man_tekst && <p> {man_tekst}</p>}
      

      {man_tekst && <hr style={{ margin: "1.5rem 0 1rem 0" }} />}

      {/* ===================== 2. SANIRANJE ===================== */}
      {objektiSafe?.length > 0  && (<h3 style={{ marginTop: "2rem" }}>
        SANIRANJE POREMEĆAJA
      </h3>
)}

{objektiSafe.map((obj, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <h4>{obj.naziv}</h4>

          {obj.stavke.map((s, idx) => (
            <div key={idx} style={{ marginLeft: "1rem" }}>
              {/* <div>
                <strong>{s.vrepoc}</strong>
                {s.vrezav && ` - ${s.vrezav}`}{" "}
                {s.dopuna_da_ne && `(${s.dopuna_da_ne})`}
              </div>

              <div>{s.recenica_man}</div> */}
              <div
  style={{
    marginLeft: "1rem",
    display: "grid",
    gridTemplateColumns: "40px 55px 55px 1fr",
    gap: "0.6rem",
    alignItems: "start",
    fontSize: "1.2rem",
    lineHeight: "1.4",
    borderBottom: "1px solid var(--color-grey-200)",
    paddingBottom: "0.3rem",
  }}
>
  <div style={{ color: "var(--color-blue-700)", fontSize: "1.1rem" }}>
    {s.dopuna_da_ne || ""}
  </div>

  <div style={{ fontWeight: "600", color: "var(--color-grey-700)" }}>
    {s.vrepoc || ""}
  </div>

  <div style={{ color: "var(--color-grey-500)" }}>
    {s.vrezav || ""}
  </div>

  <div style={{ wordBreak: "break-word" }}>
    {s.recenica_man}
  </div>
</div>

            </div>
          ))}
        </div>
      ))}

      <hr style={{ margin: "1.5rem 0 1rem 0" }} />

      {man_tekst && (
         <div
    style={{
      marginTop: "0.5rem",
      padding: "0.6rem 0.8rem",
      fontSize: "1.2rem",              // manji font (isto kao manipulacije)
      lineHeight: "1.4",
      color: "var(--color-grey-600)",
      backgroundColor: "var(--color-grey-50)",
      borderLeft: "3px solid var(--color-grey-300)",
      borderRadius: "4px",
      whiteSpace: "pre-line",          // ako ima više redova
    }}
  >
          {man_tekst}
        </div>
      )}

      {/* ===================== 3. POSLEDICE ===================== */}
      {posledice?.trim() && (
        <>
          <h3 style={{ marginTop: "2rem" }}>POSLEDICE</h3>
          <div
    style={{
      marginTop: "0.5rem",
      padding: "0.6rem 0.8rem",
      fontSize: "1.2rem",              // manji font (isto kao manipulacije)
      lineHeight: "1.4",
      color: "var(--color-grey-600)",
      backgroundColor: "var(--color-grey-50)",
      borderLeft: "3px solid var(--color-grey-300)",
      borderRadius: "4px",
      whiteSpace: "pre-line",          // ako ima više redova
    }}
  >
          {posledice}
        </div>
        </>
      )}


    </div>
    </div>
  );
}

export default Ispad;