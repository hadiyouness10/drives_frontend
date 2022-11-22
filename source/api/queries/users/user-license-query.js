import { useQuery } from "react-query";
import client from "api/client";

const getUserLicense = (userId) => async () => {
  if (!userId) return undefined;
  return await client
    .get(`/users/license/${userId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("user-license-query", e);
      throw new Error(e);
    });
};

export const useUserLicenseQuery = (userId) =>
  useQuery(["userLicense", userId], getUserLicense(userId));
