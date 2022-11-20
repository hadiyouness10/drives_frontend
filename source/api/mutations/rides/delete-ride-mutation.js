import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const deleteRide = async (rideId) => {
  return await client.delete(`/rides/${rideId}`).then((res) => res.data);
};

export const useDeleteRideMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: deleteRide,
    onSuccess: () => {
      queryClient.refetchQueries(["rides", { driverId: userId }]);
    },
  });
};
