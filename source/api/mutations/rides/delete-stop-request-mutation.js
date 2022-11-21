import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const deleteStopRequest = async (data) => {
  return await client
    .delete(`/rides/stopRequests/${data.stopRequestId}`, {
      data: {
        requestStatus: data.requestStatus,
        rideId: data.rideId,
      },
    })
    .then((res) => res.data);
};

export const useDeleteStopRequestMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: deleteStopRequest,
    onSuccess: () => {
      queryClient.refetchQueries(["stopRequests", { studentId: userId }]);
    },
  });
};
