import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const uploadUserLicense = async (data) => {
  return await client
    .post(`/users/license/${data.id}`, data)
    .then((res) => res.data);
};

export const useuploadUserLicenseMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: uploadUserLicense,
    onSuccess: (data) => {
      queryClient.refetchQueries(["userLicense", { studentId: userId }]);
    },
  });
};
