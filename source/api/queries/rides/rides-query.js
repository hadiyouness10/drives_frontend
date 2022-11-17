import { useQuery } from "react-query";
import client from "api/client";

const getRides = (driverID) => async () => {
  console.log("getting rides");
  let driverIDParam = driverID ? `driverID=${driverID}` : "";
  return await client
    .get(`/rides?${driverIDParam}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useRidesQuery = (driverID) =>
  useQuery(["rides", driverID], getRides(driverID));
