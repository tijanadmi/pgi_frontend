import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useJSDSSheme } from "./useJSDSSheme";
import ShemaList from "./ShemaList";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  margin-top: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function JSDSShemeTable() {
  const {
    isLoading,
    jednopolne,
    dispozicione,
  } = useJSDSSheme();

  if (isLoading) return <Spinner />;

  return (
    <Wrapper>
      <ShemaList
        title="ЕМС - Једнополне шеме"
        items={jednopolne}
      />

      <ShemaList
        title="ЕМС - Диспозиционе шеме"
        items={dispozicione}
      />
    </Wrapper>
  );
}

export default JSDSShemeTable;