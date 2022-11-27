import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const createComment = async (data) => {
  return await client.post("/reviews/comments", data).then((res) => res.data);
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {},
  });
};
