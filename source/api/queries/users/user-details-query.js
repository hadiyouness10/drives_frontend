import { useQuery } from "react-query";
import client from "api/client";

const getUserDetails = (userID) => async () => {
  if (!userID) return undefined;
  return await client
    .get(`/users/${userID}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useUserDetailsQuery = (userID) =>
  useQuery(["userDetails", userID], getUserDetails(userID));
