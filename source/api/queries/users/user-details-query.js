import { useQuery } from "react-query";
import client from "api/client";

const getUserDetails = (userId) => async () => {
  if (!userId) return undefined;
  return await client
    .get(`/users/${userId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("user-detials-query", e);
      throw new Error(e);
    });
};

export const useUserDetailsQuery = (userId) =>
  useQuery(["userDetails", userId], getUserDetails(userId));
