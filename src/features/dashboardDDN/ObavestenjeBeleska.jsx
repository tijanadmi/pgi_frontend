import styled from "styled-components";
import { useGetObavestenjeBeleska } from "./useGetObavestenjeBeleska";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const BeleskaText = styled.div`
  white-space: pre-line;
  font-size: 1.2rem;
  line-height: 1.5;
  margin-top: 0.5rem;
  color: #333;

  max-height: 60vh;
  overflow-y: auto;
  padding-right: 0.8rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
  }
`;

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
        <BeleskaText>
          {obav_beleska.tekst_obv}
        </BeleskaText>
      ) : (
        <p style={{ marginTop: "0.5rem", color: "#666" }}>Нема додатних обавештења.</p>
      )}
    </div>
  );
}

export default ObavestenjeBeleska;