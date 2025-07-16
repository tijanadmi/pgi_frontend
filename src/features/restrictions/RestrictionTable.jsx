import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";


import { getRestrictions } from "../../services/apiRestrictions";
import RestrictionRow from "./RestrictionRow";

import { useRestrictions } from "./useRestrictions";


function RestrictionTable() {
  const { isLoading, restrictions } = useRestrictions();
  const [searchParams] = useSearchParams();
 

  if (isLoading) return <Spinner />;
  if (!restrictions.length) return <Empty resourceName="restrictions" />;

  
  return (
    <Menus>
    <Table columns="2.2fr 2.2fr 2.2fr  1fr">
      <Table.Header>
        <div>Restrction Name Serbian</div>
        <div>Restrction Name English</div>
        <div>Restrction Name Bulgarian</div>
        <div></div>
      </Table.Header>

      <Table.Body
      data={restrictions}
      render={(restriction) => <RestrictionRow restriction={restriction} key={restriction.restriction_id} />}
      />
    </Table>
    </Menus>
  );
}

export default RestrictionTable;