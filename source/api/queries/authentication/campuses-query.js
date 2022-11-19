import { useQuery } from "react-query";
import client from "api/client";

const getCampuses = (uniID) => async () => {
  if (!uniID) return undefined;
  return await client
    .get(`/authentication/campuses/${uniID}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("campuses-query", e);
      throw new Error(e);
    });
};

export const useCampusesQuery = (uniID) =>
  useQuery(["campuses", uniID], getCampuses(uniID));
