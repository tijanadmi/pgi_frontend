import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDDNInterruptionOfDelivery } from "../../services/apiDDNInterruptionOfDeliveryP"; // import tvoje funkcije

export function useDeleteDDNInterruptionOfDeliveryP() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteInterruption } = useMutation({
    mutationFn: ({ id, version }) => deleteDDNInterruptionOfDelivery(id, version),
    onSuccess: () => {
      toast.success("Запис је успешно обрисан");

      // Osveži listu prekida
      queryClient.invalidateQueries({
        queryKey: ["prekidip"],
      });
    },
    onError: (err) => {
      if (err.message.includes("izmenjen")) {
        toast.error("Запис је у међувремену измењен од стране другог корисника. Освежи податке.");
      } else {
        toast.error(err.message || "Грешка при брисању прекида");
      }
    },
  });

  return { isDeleting, deleteInterruption };
}
