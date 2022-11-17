import { useQuery } from "react-query";
import client from "api/client";

const getLocationCoordinates = (address) => async () => {
  if (!address) return undefined;
  return await client
    .get(`/locations/coordinates/${address}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("location-coordinates-query", e);
      throw new Error(e);
    });
};

export const useLocationCoordinatesQuery = (address, autofetch = true) =>
  useQuery(["locationCoordinates", address], getLocationCoordinates(address), {
    enabled: autofetch,
    retry: false,
  });
