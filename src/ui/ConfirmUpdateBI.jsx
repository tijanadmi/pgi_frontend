import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmUpdateBI({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      {/* <Heading as="h3">Измена {resourceName}</Heading> */}
      <p>
        Да ли сте сигурни да хоћете да {resourceName} ? 
      </p>

      <div>
        <Button variation="secondary"  size="medium" disabled={disabled} onClick={onCloseModal}>
          Одустани
        </Button>
        <Button
          variation="danger"
          size="medium"
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal(); // 👈 KLJUČNO
          }}
        >
          Измени БИ
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmUpdateBI;
