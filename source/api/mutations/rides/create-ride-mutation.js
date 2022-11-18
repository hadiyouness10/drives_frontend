import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const createRide = async (data) => {
  return await client.post("/rides", data).then((res) => res.data);
};

export const useCreateRideMutation = () => {
  const queryClient = useQueryClient();
  const { userID } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: createRide,
    onSuccess: (data) => {
      queryClient.refetchQueries(["rides", { driverID: userID }]);
    },
  });
};
