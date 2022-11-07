import {
  useRideDetailsQuery,
  useRidesQuery,
  useStopRequestsQuery,
} from "api/queries";
import { RideView } from "components";
import { useContext, useState } from "react";
import {
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { AuthenticationContext } from "routes/authentication-context";

const JoinedRideCard = ({ ride, navigation }) => {
  const { data } = useRideDetailsQuery(ride.rideID);
  if (data) return <RideView {...data} pageIndex={1} navigation={navigation} />;
  else return <View />;
};

const Joined = ({ userID, navigation }) => {
  const { data } = useStopRequestsQuery({ studentID: userID });
  const joinedRidesCards = data?.map((ride) => (
    <JoinedRideCard key={ride.id} ride={ride} navigation={navigation} />
  ));
  return <View style={{ flex: 1 }}>{joinedRidesCards}</View>;
};

const Started = ({ userID, navigation }) => {
  const { data } = useRidesQuery(userID);
  const startedRidesCards = data?.map((ride) => (
    <RideView
      key={ride.id}
      pageIndex={1}
      displayDriver={false}
      navigation={navigation}
      {...ride}
    />
  ));
  return <View style={{ flex: 1 }}>{startedRidesCards}</View>;
};

export const YourRides = ({ navigation }) => {
  const layout = useWindowDimensions();
  const { userID } = useContext(AuthenticationContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "joined", title: "Rides You Joined" },
    { key: "started", title: "Your Rides" },
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

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      }}
      indicatorStyle={{ backgroundColor: "rgb(0, 125, 200)" }}
      labelStyle={{
        color: "black",
        textTransform: "none",
        fontWeight: "400",
        fontSize: 16,
      }}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../../assets/carpooling_logo.jpg")}
        style={styles.background}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "white",
            marginBottom: 20,
            marginLeft: 10,
          }}
        >
          Your Scheduled Rides
        </Text>
      </ImageBackground>
      <View
        style={{
          height: "100%",
          marginTop: -10,
        }}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: useWindowDimensions().width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rideCard: {
    marginHorizontal: 10,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgb(230, 230, 230)",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  background: {
    height: 200,
    width: "100%",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
