import { useQuery } from "react-query";
import client from "api/client";

const getRideCount = (studentId) => async () => {
  return await client
    .get(`/rides/rideCount/${studentId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("ride-count-query", e);
      throw new Error(e);
    });
};

export const useRideCountQuery = (queryParams) =>
  useQuery(["rides", queryParams], getRideCount(queryParams));
