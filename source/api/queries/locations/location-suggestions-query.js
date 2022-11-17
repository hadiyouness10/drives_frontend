import { useQuery } from "react-query";
import client from "api/client";

const getLocationSuggestions =
  (searchText, isUniversity = false) =>
  async () => {
    if (!searchText) return [];
    return await client
      .get(`/locations/suggestions/${searchText}?isUniversity=${isUniversity}`)
      .then((res) => res.data)
      .catch((e) => {
        console.error("location-suggestions-query", e);
        throw new Error(e);
      });
  };

export const useLocationSuggestionsQuery = (
  type,
  position,
  searchText,
  isUniversity
) =>
  useQuery(
    ["locationSuggestions", type, position, searchText, isUniversity],
    getLocationSuggestions(searchText, isUniversity),
    {
      keepPreviousData: true,
    }
  );
