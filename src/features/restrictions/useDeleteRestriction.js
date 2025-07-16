import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteRestriction as deleteRestrictionApi } from "../../services/apiRestrictions";

export function useDeleteRestriction() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteRestriction } = useMutation({
    mutationFn: deleteRestrictionApi,
    onSuccess: () => {
      toast.success("Restriction successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["restrictions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteRestriction };
}