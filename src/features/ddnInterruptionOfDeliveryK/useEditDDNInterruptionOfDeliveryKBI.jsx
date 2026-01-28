import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateDDNInterruptionOfDeliveryBI } from "../../services/apiDDNInterruptionOfDeliveryP";

export function useEditDDNInterruptionOfDeliveryKBI() {
  const queryClient = useQueryClient();

  const { mutate: editInterruptionOfDeliveryKBI, isLoading: isEditing } = useMutation({
    mutationFn: ({ bi, id, version }) =>
      updateDDNInterruptionOfDeliveryBI(id, version, bi),
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

  return { isEditing, editInterruptionOfDeliveryKBI };
}
