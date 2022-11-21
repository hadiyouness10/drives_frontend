import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateRide = async (data) => {
  return await client
    .patch(`/rides/${data.id}`, data.content)
    .then((res) => res.data);
};

export const useUpdateRideMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateRide,
    onSuccess: (data) => {
      queryClient.refetchQueries(["rides", { driverId: userId }]);
    },
  });
};
