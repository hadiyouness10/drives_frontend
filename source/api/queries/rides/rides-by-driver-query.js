import { useQuery } from "react-query";
import client from "api/client";

const getRidesByDriver = (driverID) => async () => {
  if (!driverID) return undefined;
  return await client
    .get(`/rides?driverID=${driverID}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useRidesByDriverQuery = (driverID) =>
  useQuery(["ridesByDriver", driverID], getRidesByDriver(driverID));
