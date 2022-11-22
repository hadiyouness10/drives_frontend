import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateUserPhoto = async (data) => {
  return await client
    .patch(`/users/photo/${data.id}`, data)
    .then((res) => res.data);
};

export const useUpdateUserPhotoMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateUserPhoto,
    onSuccess: (data) => {
      queryClient.refetchQueries(["userPhoto", userId]);
    },
  });
};
