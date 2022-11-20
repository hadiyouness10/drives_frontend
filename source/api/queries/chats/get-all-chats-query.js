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

export const useChatsQuery = (
  studentId,
  autofetch = true,
  navigation,
  createChat,
  rideId,
  firstName
) =>
  useQuery(["chatsQuery", studentId, autofetch], getChats(studentId), {
    enabled: autofetch,
    cacheTime: autofetch ? 300 : 0,
    onSuccess: (data) => {
      if (data && !autofetch) {
        if (
          data.find(
            (chat) => chat.riderId === studentId || chat.driverId === studentId
          )
        ) {
          navigation.navigate("Account", {
            screen: "Chats",
            initial: false,
          });
        } else createChat({ rideId, studentId, firstName });
      }
    },
  });
