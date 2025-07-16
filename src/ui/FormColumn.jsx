import styled from "styled-components";

const StyledFormColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tri kolone jednake širine */
  gap: 2.4rem; /* Razmak između kolona */
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
  grid-column: span 3; /* Labela se proteže na tri kolone */
  font-weight: 500;
  margin-bottom: 0.8rem;
`;


function FormColumn({ label, error, children }) {
  return (
    <StyledFormColumn>
      {label && <Label>{label}</Label>}
      {children} {/* Deca su podeljena u tri kolone */}


    </StyledFormColumn>
  );
}

export default FormColumn;
