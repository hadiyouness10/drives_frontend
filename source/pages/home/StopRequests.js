import { useStopRequestsQuery } from "api/queries";
import { useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { AuthenticationContext } from "routes/authentication-context";
import { RideView, StopRequestView } from "components";

export const StopRequests = ({ navigation }) => {
  const { userId } = useContext(AuthenticationContext);
  const { data } = useStopRequestsQuery({
    isDriver: true,
    studentId: userId,
    requestStatus: "PENDING",
    rideStatus: "PENDING",
  });

  if (data.length === 0)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 18,
            color: "grey",
            width: "70%",
            textAlign: "center",
          }}
        >
          There are no stop requests on any of your rides.
        </Text>
      </View>
    );
  else
    return (
      <View style={styles.mainView}>
        <Text
          style={{
            marginLeft: 26,
            marginTop: 40,
            marginBottom: 15,
            fontSize: 24,
          }}
        >
          Stop Requests
        </Text>
        <ScrollView>
          {data.map((stopRequest) => {
            return (
              <StopRequestView
                key={stopRequest.ID}
                {...stopRequest}
                coordinates={JSON.parse(stopRequest.coordinates)}
                userId={userId}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      </View>
    );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
});
