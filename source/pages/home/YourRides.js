import { useRidesQuery, useStopRequestsQuery } from "api/queries";
import { useContext } from "react";
import { Text, View } from "react-native";
import { AuthenticationContext } from "routes/authentication-context";

export const YourRides = () => {
  const { userID } = useContext(AuthenticationContext);
  const { data } = useStopRequestsQuery({ studentID: 1 });
  return (
    <View>
      {data?.map((stopRequest) => (
        <Text>{JSON.stringify(stopRequest)}</Text>
      ))}
    </View>
  );
};
