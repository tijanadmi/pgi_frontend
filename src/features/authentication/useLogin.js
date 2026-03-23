import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //queryClient.setQueryData(['user'], user.user);
      queryClient.setQueryData(["user"], user);
        // console.log("Logged in user:", user);
      // navigate("/dashboard", { replace: true });

      const isDDN = user?.user_role?.includes("DDN");
      const isMRC = user?.ddn?.TipPrivPrip === "MRC";

      if (isDDN && isMRC) {
        navigate("/dashboardDDN", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Неисправна шифра или лозинка");
    },
  });

  return { login, isLoading };
}
