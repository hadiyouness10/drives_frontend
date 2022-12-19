import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const createUser = async (data) => {
  return await client
    .post("/authentication/register", data)
    .then((res) => res.data);
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.refetchQueries(["student", { ID: userId }]);
    },
  });
};
