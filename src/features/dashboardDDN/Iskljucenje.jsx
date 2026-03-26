import { useGetIskljucenje } from "./useGetIskljucenje";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function Iskljucenje({ dogId }) {

  const { isLoading, iskljucenje } = useGetIskljucenje(dogId);

  if (isLoading) return <Spinner />;
//   if (error) return <div>Greška: {error.message}</div>;
  if (!iskljucenje) return <Empty resourceName="догађај" />;

  const {
    rb_dog,
    naslov,
    podnaslov,
    grazlog,
    razlog,
    uzrok_tekst,
    man_tekst,
    objekti = [],
  } = iskljucenje;

  return (
    <div>
      <h2>{rb_dog} - {naslov}</h2>
      {podnaslov && <h3>{podnaslov}</h3>}

      <div><strong>{grazlog}</strong> - {razlog}</div>

      {uzrok_tekst && <p> {uzrok_tekst}</p>}
      

      <hr />

      {objekti.map((obj, i) => (
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
    </div>
  );
}

export default Iskljucenje;