import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const createChat = async (data) => {
  return await client.post("/chat", data).then((res) => res.data);
};

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      queryClient.refetchQueries(["chatsQuery", userId, true]);
    },
  });
};
