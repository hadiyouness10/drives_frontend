import { useQuery, useQueryClient } from "react-query";
import client from "api/client";
import { useContext } from "react";
import { AuthenticationContext } from "routes/authentication-context";

const getChat = (chatId) => async () => {
  if (!chatId) return undefined;
  return await client
    .get(`/chat/${chatId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("get-chat-query", e);
      throw new Error(e);
    });
};

export const useChatQuery = (chatId) => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useQuery(["chatQuery", chatId], getChat(chatId), {
    select: (data) =>
      data.map((message) => {
        return {
          _id: message.ID,
          text: message.message,
          createdAt: message.date,
          user: {
            _id: message.studentId,
            name: "",
            avatar: "https://placeimg.com/140/140/any",
          },
        };
      }),

    onSuccess: (data) => {
      queryClient.refetchQueries(["chatsQuery", userId, true]);
    },
  });
};
