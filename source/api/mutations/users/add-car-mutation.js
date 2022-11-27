import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const addCar = async (data) => {
  return await client.post(`/users/car`, data).then((res) => res.data);
};

export const useAddCarMutation = () => {
  const queryClient = useQueryClient();
  const { userId, setAuthentication } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: addCar,
    onSuccess: (data) => {
      queryClient.refetchQueries(["userCar", userId]);
    },
  });
};
