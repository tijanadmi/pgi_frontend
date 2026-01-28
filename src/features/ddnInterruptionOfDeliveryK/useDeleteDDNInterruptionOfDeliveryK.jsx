import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDDNInterruptionOfDelivery } from "../../services/apiDDNInterruptionOfDeliveryP"; // import tvoje funkcije

export function useDeleteDDNInterruptionOfDeliveryK() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteInterruptionK } = useMutation({
    mutationFn: ({ id, version }) => deleteDDNInterruptionOfDelivery(id, version),
    onSuccess: () => {
      toast.success("Запис је успешно обрисан");

      // Osveži listu prekida
      queryClient.invalidateQueries({
        queryKey: ["prekidik"],
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

  return { isDeleting, deleteInterruptionK };
}
