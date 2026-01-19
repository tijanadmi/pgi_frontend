import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditInterruptionOfUsers } from "../../services/apiDDNInterruptionOfDeliveryK";

export function useEditDDNInterruptionOfDeliveryK() {
  const queryClient = useQueryClient();

  const { mutate: editInterruptionOfUsers, isLoading: isEditing } = useMutation({
    mutationFn: ({ newInterruption, id, version }) =>
      createEditInterruptionOfUsers(newInterruption, id, version),
    onSuccess: () => {
      toast.success("Прекид корисника је успешно измењен");
      queryClient.invalidateQueries({
        queryKey: ["prekidik"],
      });
    },
    onError: (err) => {
      if (err.message.includes("izmenjen")) {
        toast.error(
          "Запис је у међувремену измењен од стране другог корисника. Освежи податке."
        );
      } else {
        toast.error(err.message || "Грешка при измени прекида корисника");
      }
    },
  });

  return { isEditing, editInterruptionOfUsers };
}
