import client from "api/client";
import { useMutation, useQueryClient } from "react-query";

const createComment = async (data) => {
  return await client.post("/reviews/comments", data).then((res) => res.data);
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      queryClient.refetchQueries(["getComments", data?.reviewId]);
    },
  });
};
