import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkill } from "../utils/api";

const useSkill = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: getSkill,
    onSuccess: () => console.log("Skill",mutate),
    onError: (error) => console.log(error)
  });

  return { isPending, error, getSkill: mutate };
};
export default useSkill;