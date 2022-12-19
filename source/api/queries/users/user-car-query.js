import { useQuery } from "react-query";
import client from "api/client";

const getUserCar = (userId) => async () => {
  if (!userId) return undefined;
  return await client
    .get(`/users/car/${userId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("user-car-query", e);
      throw new Error(e);
    });
};

export const useUserCarQuery = (userId) =>
  useQuery(["userCar", userId], getUserCar(userId));
