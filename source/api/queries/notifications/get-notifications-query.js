import { useQuery } from "react-query";
import client from "api/client";

const getNotifications = (studentId) => async () => {
  if (!studentId) return undefined;
  return await client
    .get(`/notifications/${studentId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("get-notification-query", e);
      throw new Error(e);
    });
};

export const useGetNotificationsQuery = (chatId) =>
  useQuery(["notificationsQuery", chatId], getNotifications(chatId));
