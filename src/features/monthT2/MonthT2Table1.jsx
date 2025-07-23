import { Fragment } from "react";
import styled from "styled-components";
import MonthT2Row from "./MonthT2Row";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// import { useSearchParams } from "react-router-dom";

import { useListMonthT2 } from "./useListMonthT2";
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

function MonthT2Table() {
  const { dogadjaji, isLoading, count } = useListMonthT2();
  // const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // console.log("Mesecni T2:", dogadjaji);
  // console.log('count:', count);
  if (count === 0) return <Empty resourceName="месечни Т2" />;

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
      <Table columns="0.3fr 0.3fr 0.3fr 0.3fr 1.6fr 0.7fr 2.5fr 2.5fr 1.2fr 1.2fr">
        <Table.Header>
          <StackedH>
            <span>Из</span>
            <span>бор</span>
          </StackedH>
          <StackedH>
            <span>Ред</span>
            <span>бр</span>
          </StackedH>
          <StackedH>
            <span>Дог</span>
            <span>бр</span>
          </StackedH>
          <StackedH>
            <span></span>
          </StackedH>
          <StackedH>
            <span>Почетна</span>
            <span>Крај</span>
          </StackedH>
          <StackedH>
            <span>Трајање</span>
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
            <span>Врста догађаја</span>
          </StackedH>
          <StackedH>
            <span>Група разлога</span>
            <span>Разлог</span>
          </StackedH>
        </Table.Header>

        <Table.Body
          data={dogadjaji}
          //
          render={(pk) => (
            <Fragment key={pk.id}>
              <span></span>
              <MonthT2Row key={pk.id} pk={pk} />
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

export default MonthT2Table;
