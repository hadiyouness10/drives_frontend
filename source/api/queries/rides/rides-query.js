import { useQuery } from "react-query";
import client from "api/client";

const getRides = (queryParams) => async () => {
  // Can be driverId, destinationCoordinates, pickupCoordinates, rideStatus
  const params = queryParams
    ? Object.keys(queryParams).map((param) => `${param}=${queryParams[param]}`)
    : [];
  return await client
    .get(`/rides?${params.join("&")}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("rides-query", e);
      throw new Error(e);
    });
};

export const useRidesQuery = (queryParams) =>
  useQuery(["rides", queryParams], getRides(queryParams));
