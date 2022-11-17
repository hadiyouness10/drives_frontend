import client from "api/client";
import { useMutation } from "react-query";

const createRide = async (data) => {
  return await client.post("/rides", data).then((res) => res.data);
};

export const useCreateRideMutation = () => {
  return useMutation({ mutationFn: createRide });
};
