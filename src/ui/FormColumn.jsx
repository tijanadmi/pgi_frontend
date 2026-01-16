import styled from "styled-components";

const StyledFormColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  gap: ${(props) => props.$gap || "2.4rem"};
  align-items: start; /* Poravnanje elemenata na vrh */

  padding: 1.2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  grid-column: span ${(props) => props.$columns};
  font-weight: 500;
  margin-bottom: 0.8rem;
`;


function FormColumn({ label, error, children, columns = 3, gap }) {
  return (
    <StyledFormColumn  $columns={columns} $gap={gap}>
      {label && <Label $columns={columns}>{label}</Label>}
      {children} {/* Deca su podeljena u tri kolone */}
    </StyledFormColumn>
  );
}

export default FormColumn;
