import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateUser = async (data) => {
  return await client.patch(`/users/${data.id}`, data).then((res) => res.data);
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId, setAuthentication } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      queryClient.refetchQueries(["userDetails", userId]);
      setAuthentication((oldAuth) => ({
        ...oldAuth,
        firstName: data.firstName,
        lastName: data.lastName,
      }));
      const storedAuthentication = JSON.parse(
        await AsyncStorage.getItem("authentication")
      );
      await AsyncStorage.setItem(
        "authentication",
        JSON.stringify({
          token: storedAuthentication.token,
          userId: userId,
          firstName: data.firstName,
          lastName: data.lastName,
        })
      );
    },
  });
};
