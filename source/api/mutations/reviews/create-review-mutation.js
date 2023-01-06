import client from "api/client";
import { useMutation, useQueryClient } from "react-query";

const createReview = async (data) => {
  return await client.post("/reviews", data).then((res) => res.data);
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      queryClient.refetchQueries(["getReviews", data?.studentId]);
      queryClient.refetchQueries(["getReviewsOverview", data?.studentId]);
    },
  });
};
