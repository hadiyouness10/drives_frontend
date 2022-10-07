import { useQuery } from "react-query";
import client from "../client";

const getPossibleRoutes = (start_id, destination_id) => async () => {
  if (start_id === "" || destination_id === "") return undefined;
  return await client
    .post(
      "/possibleRoutes",
      { start_id: start_id, destination_id: destination_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data.result)
    .catch((error) => {});
};

export const usePossibleRoutesQuery = (start_id, destination_id) =>
  useQuery(
    ["possibleRoutes", start_id, destination_id],
    getPossibleRoutes(start_id, destination_id)
  );
