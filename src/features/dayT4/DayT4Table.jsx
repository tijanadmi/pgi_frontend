import { Fragment } from "react";
import styled from "styled-components";
import DayT4Row from "./DayT4Row";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import { useSearchParams } from "react-router-dom";

import { useListDayT4 } from "./useListDayT4";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

const StackedH = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;
`;

// const Opis = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.2rem;
//   color: var(--color-grey-500);
//   font-size: 1.2rem;
//   margin-left: 20px; /* Dodaje levi margin */
//   border-bottom: 1px solid var(--color-grey-300); /* Dodaje crtu ispod */
//   padding-bottom: 4px; /* Razmak između teksta i crte */
// `;

const Opis = styled.div`
  display: block;
  width: 100%;
  color: var(--color-grey-500);
  font-size: 1.2rem;
  margin-left: 20px;
  border-bottom: 1px solid var(--color-grey-300);
  padding-bottom: 4px;
  white-space: pre-wrap; /* važno ako tekst ima nove redove */
  word-wrap: break-word; /* prelama duge reči */
  overflow-wrap: break-word;
`;

function DayT4Table() {
  const { dogadjaji, isLoading, count } = useListDayT4();
  // const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // console.log("Dnevni T4:", dogadjaji);
  // console.log('count:', count);
  if (count === 0) return <Empty resourceName="дневни Т4" />;

  return (
    <Menus>
      <Table columns="1fr 5fr">
        <Table.Header>
          <StackedH>
            <span>Ст.</span>
          </StackedH>
        </Table.Header>

        <Table.Body
          data={dogadjaji}
          //
          render={(pk) => (
            <Fragment key={pk.id}>
              <span></span>
              <DayT4Row key={pk.id} pk={pk} />
              <Opis>{pk.tekst}</Opis>
            </Fragment>
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default DayT4Table;
