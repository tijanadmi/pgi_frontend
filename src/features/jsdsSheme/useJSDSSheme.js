import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getJSDSShemeByOrg } from "../../services/apiSheme";

export function useJSDSSheme() {
  const [searchParams] = useSearchParams();

  const orgId = searchParams.get("orgId") || 1;

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["jsds-sheme", orgId],
    queryFn: () => getJSDSShemeByOrg(orgId),
  });

  return {
    isLoading,
    error,
    jednopolne: data?.jednopolne || [],
    dispozicione: data?.dispozicione || [],
  };
}