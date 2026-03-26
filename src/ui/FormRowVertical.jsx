import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  grid-column: span ${(props) => props.$span || 1};
`;

const Label = styled.label`
  font-size: 1.5rem;
  color: var(--color-grey-700);

  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: 600;
      color: var(--color-grey-800);
    `}
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;



const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;

  ${(props) =>
    props.$noLabel &&
    css`
      /* stil kad nema label */
    `}

  & > * {
    width: 100%;
  }
`;

function FormRowVertical({ label, error, children, span = 1, boldLabel }) {
  return (
    <StyledFormRow $span={span}>
      {label && <Label $bold={boldLabel} htmlFor={children?.props?.id || undefined}>{label}</Label>}
      <InputWrapper $noLabel={!label}>
        {children}
      </InputWrapper>
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;