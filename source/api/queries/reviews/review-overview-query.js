import { useQuery } from "react-query";
import client from "api/client";

const getReviewOverview = (studentId) => async () => {
  if (!studentId) return undefined;
  return await client
    .get(`/reviews/overview/${studentId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("review-overview-query", e);
      throw new Error(e);
    });
};

export const useReviewOverviewQuery = (userId) =>
  useQuery(["getReviewsOverview", userId], getReviewOverview(userId));
