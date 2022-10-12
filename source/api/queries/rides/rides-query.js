import { useQuery } from "react-query";
import client from "api/client";

const getRides = (driverID) => async () => {
  let driverIDParam = driverID ? `driverID=${driverID}` : "";
  return await client
    .get(`/rides?${driverIDParam}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useRidesQuery = (driverID) =>
  useQuery(["rides", driverID], getRides(driverID));
