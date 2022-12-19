import { useQuery } from "react-query";
import client from "api/client";

const getUserPhoto = (userId) => async () => {
  if (!userId) return undefined;
  return await client
    .get(`/users/photo/${userId}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("user-photo-query", e);
      throw new Error(e);
    });
};

export const useUserPhotoQuery = (userId) =>
  useQuery(["userPhoto", userId], getUserPhoto(userId));
