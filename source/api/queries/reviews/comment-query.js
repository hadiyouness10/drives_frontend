import { useQuery } from "react-query";
import client from "api/client";

const getComments = (reviewId) => async () => {
  if (!reviewId) {
    return undefined;
  }
  return await client
    .get(`/reviews/comments?reviewId=${reviewId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("user-comments-query", e.response.data);
      throw new Error(e);
    });
};

export const useGetCommentsQuery = (reviewId) => {
  return useQuery(["getComments", reviewId], getComments(reviewId));
};
