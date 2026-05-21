import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrgs } from "./useOrgs";
import Select from "../../ui/Select";

function OrgSelect() {
  const { isLoading, orgs } = useOrgs();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOrg = searchParams.get("orgId") || "";

  // Postavljanje default vrednosti orgId = 1 ako nije već postavljena
  useEffect(() => {
    if (!searchParams.get("orgId")) {
      searchParams.set("orgId", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const options = orgs
    ? orgs.map((org) => ({ value: org.id, label: org.naziv_skr_cir }))
    : [];

  function handleChange(e) {
    searchParams.set("orgId", e.target.value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return isLoading ? (
    <p>Učitavanje...</p>
  ) : (
    <Select options={options} value={selectedOrg} onChange={handleChange} />
  );
}

export default OrgSelect;
