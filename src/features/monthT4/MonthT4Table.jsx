import { Fragment } from "react";
import styled from "styled-components";
import MonthT4Row from "./MonthT4Row";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useListMonthT4 } from "./useListMonthT4";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

const StackedH = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Opis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--color-grey-500);
  font-size: 1.2rem;
  margin-left: 20px; /* Dodaje levi margin */
  border-bottom: 1px solid var(--color-grey-300); /* Dodaje crtu ispod */
  padding-bottom: 4px; /* Razmak između teksta i crte */
`;

function MonthT4Table() {
  const { dogadjaji, isLoading, count } = useListMonthT4();

  if (isLoading) return <Spinner />;
  // console.log("Mesecni T4:", dogadjaji);
  // console.log('count:', count);
  if (count === 0) return <Empty resourceName="месечни Т4" />;

  return (
    <Menus>
      <Table columns=" 0.5fr 0.5fr 1.6fr 6fr ">
        <Table.Header>
          {/* <StackedH>
            <span>Из</span>
            <span>бор</span>
          </StackedH> */}
          <StackedH>
            <span>Ред</span>
            <span>бр</span>
          </StackedH>
          <StackedH>
            <span>Дог</span>
            <span>бр</span>
          </StackedH>
          <StackedH>
            <span>Датум</span>
            <span>извештаја</span>
          </StackedH>
          <StackedH>
            <span>Диспечерски центри</span>
          </StackedH>
        </Table.Header>

        <Table.Body
          data={dogadjaji}
          //
          render={(pk) => (
            <Fragment key={pk.id}>
              <span></span>
              <MonthT4Row key={pk.id} pk={pk} />
              <Opis>{pk.tekst}</Opis>
            </Fragment>
          )}
        />

        {/* <Table.Footer>
          <Pagination count={count} />
        </Table.Footer> */}
      </Table>
    </Menus>
  );
}

export default MonthT4Table;
