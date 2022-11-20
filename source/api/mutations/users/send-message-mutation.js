import client from "api/client";
import { useMutation, useQueryClient } from "react-query";

const sendMessage = async (data) => {
  return await client.post("/chat/sendMessage", data).then((res) => res.data);
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.refetchQueries("chatQuery");
    },
  });
};
