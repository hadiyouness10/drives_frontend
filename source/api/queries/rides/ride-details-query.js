import { useQuery } from "react-query";
import client from "api/client";

const getRideDetails = (rideID) => async () => {
  if (!rideID) return undefined;
  return await client
    .get(`/rides/${rideID}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useRideDetailsQuery = (rideID) =>
  useQuery(["rideDetails", rideID], getRideDetails(rideID));