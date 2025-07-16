import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRestriction } from "../../services/apiRestrictions";
import { toast } from "react-hot-toast";

export function useEditRestriction() {
  const queryClient = useQueryClient();

  const { mutate: editRestriction, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRestrictionData, id }) => createEditRestriction(newRestrictionData, id),
    onSuccess: () => {
      toast.success("Restriction successfully edited");
      queryClient.invalidateQueries({ queryKey: ["restrictions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editRestriction };
}