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

export const useChatsQuery = ({
  isDriver,
  studentId,
  riderId,
  driverId,
  autofetch = true,
  navigation,
  createChat,
  rideId,
  firstName,
  receiverId,
}) => {
  return useQuery(
    ["chatsQuery", studentId ?? (isDriver ? driverId : riderId), autofetch],
    getChats(studentId ?? (isDriver ? driverId : riderId)),
    {
      enabled: autofetch,
      cacheTime: autofetch ? 300 : 0,
      onSuccess: (data) => {
        if (data && !autofetch) {
          if (
            data.find(
              (chat) =>
                (chat.riderId === riderId && chat.driverId === driverId) ||
                (chat.riderId === driverId && chat.driverId === riderId)
            )
          ) {
            navigation.navigate("Account", {
              screen: "Chats",
              initial: false,
            });
          } else {
            if (riderId !== driverId) {
              const date = new Date().toISOString();
              createChat({
                isDriver,
                riderId,
                driverId,
                rideId,
                firstName,
                receiverId,
                date: `${date.substring(0, 10)} ${date.substring(
                  date.indexOf("T") + 1,
                  date.indexOf("T") + 8
                )}`,
              });
            }
          }
        }
      },
    }
  );
};
