import { useAngazovaniRuk } from "./useAngazovaniRuk";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function AngazovaniRukovaoci({ dogId }) {
  const { isLoading, angazovaniRuk } = useAngazovaniRuk(dogId);

  if (isLoading) return <Spinner />;
  if (!angazovaniRuk) return <Empty resourceName="догађај" />;

  const {
    rb_dog,
    naslov,
    podnaslov,
    angazovani_rukovaoci,
  } = angazovaniRuk;

  if (!angazovani_rukovaoci)
    return <Empty resourceName="ангажовани руководилац" />;

  const {
    vreme_naloga,
    ime_naloga,
    vreme_dolaska,
    vreme_odlaska,
    rukovalac,
    objekat,
    opis,
  } = angazovani_rukovaoci;

  return (
    <div>
      <h2>
        {rb_dog} - {naslov}
      </h2>

      {podnaslov && <h3>{podnaslov}</h3>}

      <div
        style={{
          marginTop: "1rem",
          fontSize: "1.2rem",
          lineHeight: "1.6",
        }}
      >
        <div>
          <strong>Dana:</strong>{" "}
          {vreme_naloga &&
            new Date(vreme_naloga).toLocaleString("sr-RS")}
        </div>

        <div>
          <strong>Nalog izdat:</strong> {ime_naloga}
        </div>

        <div>
          <strong>Vreme dolaska:</strong>{" "}
          {vreme_dolaska &&
            new Date(vreme_dolaska).toLocaleString("sr-RS")}
        </div>

        <div>
          <strong>Vreme odlasca:</strong>{" "}
          {vreme_odlaska &&
            new Date(vreme_odlaska).toLocaleString("sr-RS")}
        </div>

        <div>
          <strong>Rukovalac:</strong> {rukovalac}
        </div>

        <div>
          <strong>Objekat:</strong> {objekat}
        </div>

        {opis && (
          <>
            <hr style={{ margin: "1rem 0" }} />
            <div>{opis}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default AngazovaniRukovaoci;