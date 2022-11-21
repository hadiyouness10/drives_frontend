import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";
import { useUpdateRideMutation } from "./update-ride-mutation";

const deleteRide = async (rideId) => {
  return await client.delete(`/rides/${rideId}`).then((res) => res.data);
};

export const useDeleteRideMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  const { mutate: updateRide } = useUpdateRideMutation();
  return useMutation({
    mutationFn: deleteRide,
    onSuccess: (data) => {
      queryClient.refetchQueries(["rides", { driverId: userId }]);
    },
    onError: (err) => {
      if (err.response.data.rideId)
        updateRide({
          id: err.response.data.rideId,
          content: {
            newStatus: "CANCELED",
          },
        });
    },
  });
};
