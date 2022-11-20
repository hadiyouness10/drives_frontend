import { useQuery } from "react-query";
import client from "api/client";

const getChats = (studentId) => async () => {
  if (!studentId) return undefined;
  return await client
    .get(`/chat/getAllChats/${studentId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("get-chats-query", e);
      throw new Error(e);
    });
};

export const useChatsQuery = (studentId) =>
  useQuery(["chatsQuery", studentId], getChats(studentId));
