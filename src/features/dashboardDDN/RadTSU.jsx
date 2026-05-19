import { useGetRadTSU } from "./useGetRadTSU";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function RadTSU({ dogId }) {

  const { isLoading, radtsu } = useGetRadTSU(dogId);

//   console.log("Dohvaćen RadTSU:", radtsu);

  if (isLoading) return <Spinner />;
//   if (error) return <div>Greška: {error.message}</div>;
  if (!radtsu) return <Empty resourceName="догађај" />;

  const {
    rb_dog,
    naslov,
    podnaslov,
    uzrok_tekst,
    man_tekst,
    detaljT567 = [],
  } = radtsu;

  return (
    <div>
      <h2>{rb_dog} - {naslov}</h2>
      {podnaslov && <h3>{podnaslov}</h3>}

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
            <div style={{ color: "var(--color-grey-700)" }}>
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


    
    </div>
  );
}

export default RadTSU;