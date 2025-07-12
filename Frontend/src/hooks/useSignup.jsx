import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../utils/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, signupMutation: mutate };
};
export default useSignUp;