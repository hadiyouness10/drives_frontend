import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const createStopRequest = async (data) => {
  return await client.post("/rides/stopRequests", data).then((res) => res.data);
};

export const useStopRequestMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: createStopRequest,
    onSuccess: (data) => {
      queryClient.refetchQueries(["stopRequests", { studentId: userId }]);
    },
  });
};
