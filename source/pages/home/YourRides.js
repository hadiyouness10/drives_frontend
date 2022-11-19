import {
  useRideDetailsQuery,
  useRidesQuery,
  useStopRequestsQuery,
} from "api/queries";
import { RideView } from "components";
import { useContext, useEffect, useRef, useState } from "react";
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

const JoinedRideCard = ({ stopRequest, navigation }) => {
  const { data } = useRideDetailsQuery(stopRequest.rideId);
  if (data)
    return (
      <RideView
        {...data}
        stopRequest={stopRequest}
        pageIndex={1}
        navigation={navigation}
      />
    );
  else return <Text>Loading</Text>;
};

const Joined = ({ userId, navigation, dateOfPageRoute }) => {
  const { data, isLoading } = useStopRequestsQuery({ studentId: userId });
  const scrollRef = useRef(null);
  useEffect(() => {
    // if (dateOfPageRoute)
    //   setTimeout(() => {
    //     scrollRef.current.scrollToEnd({ animated: true });
    //   }, 500);
  }, [dateOfPageRoute]);

  const joinedRidesCards = data?.map((stopRequest) => (
    <JoinedRideCard
      key={stopRequest.ID}
      stopRequest={stopRequest}
      navigation={navigation}
    />
  ));
  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, color: "grey" }}>Loading...</Text>
      </View>
    );
  else if (!data || data.length === 0)
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
          You have not joined any rides.
        </Text>
      </View>
    );
  else
    return (
      <ScrollView ref={scrollRef} style={{ flex: 1, marginTop: 5 }}>
        {joinedRidesCards}
      </ScrollView>
    );
};

const Started = ({ userId, navigation, dateOfPageRoute }) => {
  const { data, isLoading } = useRidesQuery({ driverId: userId });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (dateOfPageRoute)
      setTimeout(() => {
        // if (scrollRef.current)
        // scrollRef.current.scrollToEnd({ animated: true });
      }, 500);
  }, [dateOfPageRoute]);

  const startedRidesCards = data?.map((ride) => (
    <RideView
      key={ride.ID}
      pageIndex={1}
      displayDriver={false}
      navigation={navigation}
      {...ride}
    />
  ));
  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, color: "grey" }}>Loading...</Text>
      </View>
    );
  else if (!data || data.length === 0)
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
          You have not started any rides.
        </Text>
      </View>
    );
  else
    return (
      <ScrollView ref={scrollRef} style={{ flex: 1, marginTop: 5 }}>
        {startedRidesCards}
      </ScrollView>
    );
};

export const YourRides = ({ route, navigation }) => {
  const { defaultIndex, date: dateOfPageRoute } = route?.params || {};
  const { userId } = useContext(AuthenticationContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "joined", title: "Rides You Joined" },
    { key: "started", title: "Rides You Started" },
  ]);

  useEffect(() => {
    if (defaultIndex && defaultIndex !== index)
      setTimeout(() => {
        setIndex(defaultIndex);
      }, 200);
  }, [defaultIndex, dateOfPageRoute]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "joined":
        return (
          <Joined
            userId={userId}
            navigation={navigation}
            dateOfPageRoute={dateOfPageRoute}
          />
        );
      case "started":
        return (
          <Started
            userId={userId}
            navigation={navigation}
            dateOfPageRoute={dateOfPageRoute}
          />
        );
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
