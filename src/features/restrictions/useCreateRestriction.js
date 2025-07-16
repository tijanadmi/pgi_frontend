import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditRestriction } from "../../services/apiRestrictions";

export function useCreateRestriction() {
  const queryClient = useQueryClient();

  const { mutate: createRestriction, isLoading: isCreating } = useMutation({
    mutationFn: createEditRestriction,
    onSuccess: () => {
      toast.success("New restriction successfully created");
      queryClient.invalidateQueries({ queryKey: ["restrictions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createRestriction };
}