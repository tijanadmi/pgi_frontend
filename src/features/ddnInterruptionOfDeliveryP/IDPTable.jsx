import { Fragment } from "react";
import styled from "styled-components";
import IDPRow from "./IDPRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ExportExcelButton from "../../ui/ExportExcelButton";

import { useListDDNInterruptionOfDeliveryP } from "./useListDDNInterruptionOfDeliveryP";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { useListDDNInterruptionOfDeliveryPExcel } from "./useListDDNInterruptionOfDeliveryPExcel";

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
  margin-left: 10px; /* Dodaje levi margin */
  border-bottom: 1px solid var(--color-grey-300); /* Dodaje crtu ispod */
  padding-bottom: 4px; /* Razmak između teksta i crte */
`;

function IDPTable() {
  const { prekidip, isLoading, count } = useListDDNInterruptionOfDeliveryP();
  const {
    prekidip: prekidipExcel,
    isLoading: isLoading2,
    count: count2,
  } = useListDDNInterruptionOfDeliveryPExcel();

  if (isLoading || isLoading2) return <Spinner />;
  // console.log('Reservations:', reservations);
  // console.log('count:', count);
  if (count === 0) return <Empty resourceName="прекид производње" />;

  return (
    <Menus>
      <Table columns="1.2fr 1.2fr 1.5fr 1.2fr 1fr 2.5fr 1.2fr 1fr">
        <Table.Header>
          <StackedH>
            <span>Производни</span>
            <span>објекат</span>
          </StackedH>
          <StackedH>
            <span>Генератор</span>
          </StackedH>
          <StackedH>
            <span>Почетак</span>
            <span>Крај прек.</span>
          </StackedH>
          <StackedH>
            <span>Врста пр.</span>
          </StackedH>
          <StackedH>
            <span>Планиран/</span>
            <span>Непланиран</span>
          </StackedH>
          <StackedH>
            <span>Узрок/</span>
            <span>Подузрок</span>
          </StackedH>
          <StackedH>
            <span>Испала</span>
            <span>Снага</span>
          </StackedH>
          <StackedH>
            {count === count2 && (
              <ExportExcelButton
                data={prekidipExcel}
                filename="PrekidProizvodnje.xlsx"
              >
                Excel
              </ExportExcelButton>
            )}
          </StackedH>
        </Table.Header>

        <Table.Body
          data={prekidip}
          //
          render={(pp) => (
            <Fragment key={pp.id}>
              <span></span>
              <IDPRow key={pp.id} pp={pp} />
              <Opis>{pp.opis}</Opis>
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

export default IDPTable;
