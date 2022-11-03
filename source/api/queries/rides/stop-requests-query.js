import { useQuery } from "react-query";
import client from "api/client";

const getStopRequests = (queryParams) => async () => {
  // Can be rideID or studentID
  const params = Object.keys(queryParams).map(
    (param) => `${param}=${queryParams[param]}`
  );
  return await client
    .get(`/rides/stopRequests?${params.join("&")}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useStopRequestsQuery = (queryParams = {}) =>
  useQuery(["stopRequests", queryParams], getStopRequests(queryParams));
