import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const LoginUser = async (data) => {
  return await client
    .post("/authentication/login", data)
    .then((res) => res.data);
};

export const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      queryClient.refetchQueries(["student", { ID: userId }]);
    },
  });
};
