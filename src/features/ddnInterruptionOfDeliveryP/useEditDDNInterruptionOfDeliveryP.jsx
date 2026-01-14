import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditInterruptionOfProduction } from "../../services/apiDDNInterruptionOfDeliveryP";

export function useEditDDNInterruptionOfDeliveryP() {
  const queryClient = useQueryClient();

  const { mutate: editInterruptionOfProduction, isLoading: isEditing } = useMutation({
    mutationFn: ({ newInterruption, id, version }) =>
      createEditInterruptionOfProduction(newInterruption, id, version),
    onSuccess: () => {
      toast.success("Прекид производње је успешно измењен");
      queryClient.invalidateQueries({
        queryKey: ["prekidip"],
      });
    },
    onError: (err) => {
      if (err.message.includes("izmenjen")) {
        toast.error(
          "Запис је у међувремену измењен од стране другог корисника. Освежи податке."
        );
      } else {
        toast.error(err.message || "Грешка при измени прекида производње");
      }
    },
  });

  return { isEditing, editInterruptionOfProduction };
}
