import { useQuery } from "react-query";
import client from "api/client";

const getRideDetails = (rideId) => async () => {
  if (!rideId) return undefined;
  return await client
    .get(`/rides/${rideId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("ride-details-query", e);
      throw new Error(e);
    });
};

export const useRideDetailsQuery = (rideId) =>
  useQuery(["rideDetails", rideId], getRideDetails(rideId));
