import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      console.log("mutate",mutate)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { isPending, error, signupMutation: mutate };
};
export default useSignUp;
