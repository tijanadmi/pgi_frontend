import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 1.6rem;
  margin-bottom: 2.4rem;

  border-bottom: 1px solid var(--color-grey-200);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  margin-top: 0.4rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2.2rem;
  line-height: 1;
  color: var(--color-grey-500);

  &:hover {
    color: var(--color-grey-700);
  }
`;

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <Wrapper>
      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>

      {onClose && (
        <CloseButton onClick={onClose} aria-label="Затвори">
          ×
        </CloseButton>
      )}
    </Wrapper>
  );
}

export default ModalHeader;
