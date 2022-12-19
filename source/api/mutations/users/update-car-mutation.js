import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateCar = async (data) => {
  return await client
    .patch(`/users/car/${data.studentId}`, data)
    .then((res) => res.data);
};

export const useUpdateCarMutation = () => {
  const queryClient = useQueryClient();
  const { userId, setAuthentication } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateCar,
    onSuccess: (data) => {
      queryClient.refetchQueries(["userCar", userId]);
    },
  });
};
