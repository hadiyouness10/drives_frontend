import { useQuery } from "react-query";
import client from "api/client";

const getLocationName = (coordinates) => async () => {
  if (!coordinates) return undefined;
  return await client
    .get(`/locations/nameFromCoords/${JSON.stringify(coordinates)}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("location-name-query", e);
      throw new Error(e);
    });
};

export const useLocationNameQuery = (coordinates) =>
  useQuery(["locationCoordinates", coordinates], getLocationName(coordinates), {
    enabled: false,
  });
