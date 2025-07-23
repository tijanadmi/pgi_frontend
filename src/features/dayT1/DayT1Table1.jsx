import { Fragment } from "react";
import styled from "styled-components";
import DayT1Row from "./DayT1Row";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import { useSearchParams } from "react-router-dom";

import { useListDayT1 } from "./useListDayT1";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

const StackedH = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;
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

function DayT1Table() {
  const { dogadjaji, isLoading, count } = useListDayT1();
  // const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // console.log("Dnevni T1:", dogadjaji);
  // console.log('count:', count);
  if (count === 0) return <Empty resourceName="дневни Т1" />;

  // 1) FILTER
  // const filterValue = searchParams.get("funp") || "all";

  // let filteredDogadjaji;
  // if (filterValue === "all") filteredDogadjaji = dogadjaji;
  // if (filterValue === "DV")
  //   filteredDogadjaji = dogadjaji.filter((dogadjaj) => dogadjaj.fup === "DV");
  // if (filterValue === "TR")
  //   filteredDogadjaji = dogadjaji.filter((dogadjaj) => dogadjaj.fup === "TR");
  // if (filterValue === "SP")
  //   filteredDogadjaji = dogadjaji.filter((dogadjaj) => dogadjaj.fup === "SP");
  // if (filterValue === "SS")
  //   filteredDogadjaji = dogadjaji.filter((dogadjaj) => dogadjaj.fup === "SS");

  return (
    <Menus>
      <Table columns="0.3fr 0.3fr  0.5fr 0.5fr 1fr 2.5fr 2.5fr 0.6fr 1.2fr 1.2fr">
        <Table.Header>
          <StackedH>
            <span>Ст.</span>
          </StackedH>
          <StackedH>
            <span>Бр.</span>
          </StackedH>
          <StackedH>
            <span>Поч.</span>
            <span>Крај</span>
          </StackedH>
          <StackedH>
            <span></span>
            <span></span>
          </StackedH>
          <StackedH>
            <span>Трај.</span>
          </StackedH>
          <StackedH>
            <span>Објекат</span>
            <span></span>
          </StackedH>
          <StackedH>
            <span>Поље/Трафо</span>
            <span></span>
          </StackedH>
          <StackedH>
            <span>Снага</span>
          </StackedH>
          <StackedH>
            <span>Врста догађаја</span>
            <span>Врем. услови</span>
          </StackedH>
          <StackedH>
            <span>Група узрока</span>
            <span>Узрок</span>
          </StackedH>
        </Table.Header>

        <Table.Body
          data={dogadjaji}
          //
          render={(pk) => (
            <Fragment key={pk.id}>
              <span></span>
              <DayT1Row key={pk.id} pk={pk} />
              <Opis>{pk.description}</Opis>
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

export default DayT1Table;
