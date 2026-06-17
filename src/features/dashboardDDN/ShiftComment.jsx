import styled from "styled-components";

const Container = styled.div`
  min-width: 50rem;
  max-width: 70rem;
  max-height: 80vh;

  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin-bottom: 1.6rem;
  flex-shrink: 0;
`;

const CommentBox = styled.div`
  padding: 1.6rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  background: var(--color-grey-50);

  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;

  max-height: 60vh;
  overflow-y: auto;
`;

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sr-RS");
}

function ShiftComment({ shiftData }) {
  const isDay = shiftData.id_tip_smena === 1;

  return (
    <Container>
      <Heading>
        Коментар за {isDay ? "дневну" : "ноћну"} смену за дан{" "}
        {formatDate(shiftData.dat_dnev)} – {shiftData.rdc}
      </Heading>

      <CommentBox>
        {shiftData.koment_zat || "Није унет коментар."}
      </CommentBox>
    </Container>
  );
}

export default ShiftComment;