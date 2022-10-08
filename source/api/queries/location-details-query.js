import { useQuery } from "react-query";
import client from "../client";

const getLocationDetails = (place_id) => async () => {
  if (!place_id) return undefined;
  return await client
    .get(`/locationDetails/${place_id}`)
    .then((res) => res.data.result)
    .catch((error) => {});
};

export const useLocationDetailsQuery = (place_id) =>
  useQuery(["locationDetails", place_id], getLocationDetails(place_id));
