import { useQuery } from "react-query";
import client from "../client";

const getLocationSuggestions = (searchText) => async () => {
  return await client
    .post(
      `/locationSuggestions`,
      { location: searchText },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data.result)
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
