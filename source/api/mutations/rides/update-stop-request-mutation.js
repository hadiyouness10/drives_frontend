import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateStopRequest = async (data) => {
  return await client
    .patch(`/rides/stopRequests/${data.id}`, data.content)
    .then((res) => res.data);
};

export const useUpdateStopRequestMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateStopRequest,
    onSuccess: (data) => {
      queryClient.refetchQueries(["stopRequests", { studentId: userId }]);
    },
  });
};
