import {
  useRideDetailsQuery,
  useRidesQuery,
  useStopRequestsQuery,
} from "api/queries";
import { RideView } from "components";
import { useContext, useEffect, useState } from "react";
import {
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { AuthenticationContext } from "routes/authentication-context";

const JoinedRideCard = ({ ride, navigation }) => {
  const { data } = useRideDetailsQuery(ride.rideID);
  if (data) return <RideView {...data} pageIndex={1} navigation={navigation} />;
  else return <Text>Loading</Text>;
};

const Joined = ({ userID, navigation }) => {
  const { data } = useStopRequestsQuery({ studentID: userID });
  const joinedRidesCards = data?.map((ride) => (
    <JoinedRideCard key={ride.id} ride={ride} navigation={navigation} />
  ));
  return (
    <ScrollView style={{ flex: 1, marginTop: 5 }}>
      {joinedRidesCards}
    </ScrollView>
  );
};

const Started = ({ userID, navigation }) => {
  const { data } = useRidesQuery({ driverID: userID });
  const startedRidesCards = data?.map((ride) => (
    <RideView
      key={ride.ID}
      pageIndex={1}
      displayDriver={false}
      navigation={navigation}
      {...ride}
    />
  ));
  return (
    <ScrollView style={{ flex: 1, marginTop: 5 }}>
      {startedRidesCards}
    </ScrollView>
  );
};

export const YourRides = ({ route, navigation }) => {
  const { defaultIndex, date: dateOfRoute } = route?.params || {};
  const { userID } = useContext(AuthenticationContext);
  console.log("index", defaultIndex, dateOfRoute);
  const [index, setIndex] = useState(0);
  console.log("kj", index);
  const [routes] = useState([
    { key: "joined", title: "Rides You Joined" },
    { key: "started", title: "Rides You Started" },
  ]);

  useEffect(() => {
    if (defaultIndex) setIndex(defaultIndex);
  }, [defaultIndex, dateOfRoute]);

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
          Scheduled Rides
        </Text>
      </ImageBackground>
      <View
        style={{
          flex: 1,
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
    justifyContent: "flex-end",
  },
});
