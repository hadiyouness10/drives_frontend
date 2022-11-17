import { useQuery } from "react-query";
import client from "api/client";

const getRides = (queryParams) => async () => {
  // Can be driverID, destinationCoordinates, pickupCoordinates
  const params = queryParams
    ? Object.keys(queryParams).map((param) => `${param}=${queryParams[param]}`)
    : [];

  return await client.get(`/rides?${params.join("&")}`).then((res) => res.data);
};

export const useRidesQuery = (queryParams) =>
  useQuery(["rides", queryParams], getRides(queryParams));
