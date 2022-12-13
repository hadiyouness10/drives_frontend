import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateUserPhoto = (userId) => async (data) => {
  return await client
    .post(`/users/photo/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const useUpdateUserPhotoMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateUserPhoto(userId),
    onSuccess: (data) => {
      queryClient.refetchQueries(["userPhoto", userId]);
    },
  });
};
