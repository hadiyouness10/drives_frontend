import { useQuery } from "react-query";
import client from "../client";

const getLocationDetails = (place_id) => async () => {
  if (!place_id) return undefined;
  return await client
    .get(`/locations/details/${place_id}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useLocationDetailsQuery = (place_id) =>
  useQuery(["locationDetails", place_id], getLocationDetails(place_id));
