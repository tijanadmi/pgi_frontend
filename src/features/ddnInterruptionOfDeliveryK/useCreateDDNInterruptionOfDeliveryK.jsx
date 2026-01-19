// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { createInterruptionOfProduction } from "../../services/apiDDNInterruptionOfDeliveryP";

// export function useCreateDDNInterruptionOfDeliveryP() {
//   const queryClient = useQueryClient();

//   const {
//     mutate: createInterruptionOfProductionMutation,
//     isLoading: isCreating,
//   } = useMutation({
//     mutationFn: createInterruptionOfProduction,
//     onSuccess: () => {
//       toast.success("Prekid proizvodnje je uspešno sačuvan");
//       queryClient.invalidateQueries({
//         queryKey: ["interruptionOfProduction"],
//       });
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   return {
//     isCreating,
//     createInterruptionOfProduction: createInterruptionOfProductionMutation,
//   };
// }

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditInterruptionOfUsers } from "../../services/apiDDNInterruptionOfDeliveryK";

export function useCreateDDNInterruptionOfDeliveryK() {
  const queryClient = useQueryClient();

  const { mutate: createInterruptionOfUsers, isLoading: isCreating } = useMutation({
    mutationFn: (newInterruption) =>
      createEditInterruptionOfUsers(newInterruption),
    onSuccess: () => {
      toast.success("Прекид корисника је успешно креиран");
      queryClient.invalidateQueries({
        queryKey: ["prekidik"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Грешка при креирању прекида корисника");
    },
  });

  return { isCreating, createInterruptionOfUsers };
}
