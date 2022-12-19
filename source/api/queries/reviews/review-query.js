import { useQuery } from "react-query";
import client from "api/client";

const getReviews = (userId) => async () => {
  if (!userId) return undefined;
  return await client
    .get(`/reviews?studentId=${userId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("user-reviews-query", e);
      throw new Error(e);
    });
};

export const useGetReviewsQuery = (userId) =>
  useQuery(["getReviews", userId], getReviews(userId));
