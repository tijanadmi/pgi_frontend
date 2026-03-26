import { useGetObavestenjeBeleska } from "./useGetObavestenjeBeleska";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function ObavestenjeBeleska({ dogId }) {
  const { isLoading, obavestenjeBeleska } = useGetObavestenjeBeleska(dogId);

  if (isLoading) return <Spinner />;
  if (!obavestenjeBeleska) return <Empty resourceName="обавештење" />;

  const { rb_dog, naslov, podnaslov, obav_beleska } = obavestenjeBeleska;

  return (
    <div>
      <h2 style={{ marginBottom: "0.5rem" }}>
        {rb_dog} - {naslov}
      </h2>
      {podnaslov && (
        <h3 style={{ marginTop: 0, marginBottom: "1rem", fontWeight: 500, color: "#555" }}>
          {podnaslov}
        </h3>
      )}

      <hr style={{ margin: "1rem 0" }} />

      {obav_beleska?.tekst_obv ? (
        <div
          style={{
            whiteSpace: "pre-line",
            fontSize: "1.2rem",      // malo manji font
            lineHeight: 1.5,
            marginTop: "0.5rem",      // razmak od naslova / hr
            color: "#333",
          }}
        >
          {obav_beleska.tekst_obv}
        </div>
      ) : (
        <p style={{ marginTop: "0.5rem", color: "#666" }}>Нема додатних обавештења.</p>
      )}
    </div>
  );
}

export default ObavestenjeBeleska;