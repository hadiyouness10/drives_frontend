import {
  useRideDetailsQuery,
  useRidesQuery,
  useStopRequestsQuery,
} from "api/queries";
import { useContext, useState } from "react";
import { Text, useWindowDimensions, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TabView, SceneMap } from "react-native-tab-view";
import { AuthenticationContext } from "routes/authentication-context";
import { dateTimeFormatter } from "utils";

const RideCard = ({
  id,
  driverID,
  departureLocation,
  destinationLocation,
  dateOfDeparture,
  pricePerRider,
  navigation,
}) => (
  <TouchableOpacity
    style={styles.rideCard}
    onPress={() =>
      navigation.navigate("Ride Details", { rideID: id, driverID })
    }
  >
    <View>
      <Text style={{ fontSize: 12, color: "grey" }}>From</Text>
      <Text style={{ fontSize: 16 }}>{departureLocation}</Text>
      <Text style={{ fontSize: 12, color: "grey", marginTop: 5 }}>To</Text>
      <Text style={{ fontSize: 16 }}>{destinationLocation}</Text>
      <Text style={{ fontSize: 12, color: "grey", marginTop: 5 }}>Price</Text>
      <Text style={{ fontSize: 16 }}>{pricePerRider}</Text>
    </View>
    <View>
      <Text style={{ fontSize: 12, color: "grey" }}>Date</Text>
      <Text style={{ fontSize: 16 }}>
        {dateTimeFormatter(new Date(dateOfDeparture), "date")}
      </Text>
      <Text style={{ fontSize: 12, color: "grey", marginTop: 5 }}>Time</Text>
      <Text style={{ fontSize: 16 }}>
        {dateTimeFormatter(new Date(dateOfDeparture))}
      </Text>
    </View>
  </TouchableOpacity>
);

const JoinedRideCard = ({ ride, navigation }) => {
  const { data } = useRideDetailsQuery(ride.rideID);
  if (data) return <RideCard {...data} navigation={navigation} />;
  else return <View />;
};

const Joined = ({ userID, navigation }) => {
  const { data } = useStopRequestsQuery({ studentID: userID });
  const joinedRidesCards = data?.map((ride) => (
    <JoinedRideCard ride={ride} navigation={navigation} />
  ));
  return <View style={{ flex: 1 }}>{joinedRidesCards}</View>;
};

const Started = ({ userID, navigation }) => {
  const { data } = useRidesQuery(userID);
  const startedRidesCards = data?.map((ride) => (
    <RideCard {...ride} navigation={navigation} />
  ));
  return <View style={{ flex: 1 }}>{startedRidesCards}</View>;
};

export const YourRides = ({ navigation }) => {
  const layout = useWindowDimensions();
  const { userID } = useContext(AuthenticationContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "joined", title: "Joined" },
    { key: "started", title: "Started" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "joined":
        return <Joined userID={userID} navigation={navigation} />;
      case "started":
        return <Started userID={userID} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ height: "100%", marginTop: 150 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rideCard: {
    marginHorizontal: 10,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
