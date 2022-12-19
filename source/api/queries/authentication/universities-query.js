import { useQuery } from "react-query";
import client from "api/client";

const getUniversities = () => async () => {
  return await client
    .get(`/authentication/universities`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("universities-query", e);
      throw new Error(e);
    });
};

export const useUniversitiesQuery = () =>
  useQuery(["universities"], getUniversities());
