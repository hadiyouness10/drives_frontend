import { useQuery } from "react-query";
import client from "../client";

const getLocationSuggestions = (searchText) => async () => {
  if (!searchText) return [];
  return await client
    .get(`/locations/suggestions/${searchText}`)
    .then((res) => res.data)
    .catch((error) => {});
};

export const useLocationSuggestionsQuery = (type, position, searchText) =>
  useQuery(
    ["locationSuggestions", type, position, searchText],
    getLocationSuggestions(searchText),
    {
      keepPreviousData: true,
    }
  );
