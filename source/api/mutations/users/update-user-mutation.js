import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateUser = async (data) => {
  return await client.patch(`/users/${data.id}`, data).then((res) => res.data);
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.refetchQueries(["Users", { studentId: userId }]);
    },
  });
};
