import { useQuery } from "react-query";
import client from "api/client";

const getLocationSuggestions = (searchText) => async () => {
  if (!searchText) return [];
  return await client
    .get(`/locations/suggestions/${searchText}`)
    .then((res) => res.data);
};

export const useLocationSuggestionsQuery = (type, position, searchText) =>
  useQuery(
    ["locationSuggestions", type, position, searchText],
    getLocationSuggestions(searchText),
    {
      keepPreviousData: true,
    }
  );
