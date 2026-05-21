
import styled from "styled-components";
import Empty from "../../ui/Empty";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Box = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  background: var(--color-grey-0);
  overflow: hidden;
`;

const BoxHeader = styled.div`
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-200);
  font-weight: 600;
  font-size: 1.5rem;
  background-color: var(--color-grey-50);
`;

const ScrollArea = styled.div`
  max-height: 70vh;
  overflow-y: auto;
`;

const Item = styled.a`
  display: block;
  padding: 1rem 1.4rem;
  border-bottom: 1px solid var(--color-grey-100);

  color: var(--color-brand-600);
  text-decoration: none;
  font-size: 1.3rem;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const DateText = styled.div`
  font-size: 1.1rem;
  color: var(--color-grey-500);
  margin-top: 0.3rem;
`;

function ShemaList({ title, items }) {
  if (!items.length) {
    return (
      <Box>
        <BoxHeader>{title}</BoxHeader>

        <div style={{ padding: "2rem" }}>
          <Empty resourceName="шеме" />
        </div>
      </Box>
    );
  }

  return (
    <Box>
      <BoxHeader>{title}</BoxHeader>

      <ScrollArea>
        {items.map((s) => (
          <Item
            key={s.id}
            href={`${API_URL}/getshemepdf/${s.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>{s.ime_dok}</div>

            {s.datpri && (
              <DateText>{s.datpri}</DateText>
            )}
          </Item>
        ))}
      </ScrollArea>
    </Box>
  );
}

export default ShemaList;