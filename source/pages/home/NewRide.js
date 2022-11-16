import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { InputDetails } from "components";
import { AuthenticationContext } from "routes/authentication-context";
import { TabBar, TabView } from "react-native-tab-view";
import { useLocationCoordinatesQuery } from "api/queries";

const JoinRide = ({ inputDetailsProps, navigation }) => {
  const [isPressed, setIsPressed] = useState(false);
  const {
    data: departureCoordinates,
    refetch: fetchStart,
    isError: startError,
  } = useLocationCoordinatesQuery(inputDetailsProps.startLocation, false);

  const {
    data: destinationCoordinates,
    refetch: fetchDestination,
    isError: destinationError,
  } = useLocationCoordinatesQuery(inputDetailsProps.destinationLocation, false);

  useEffect(() => {
    if (
      !inputDetailsProps.startLocation &&
      !inputDetailsProps.destinationLocation
    ) {
      navigation.push("Riders");
    }
    if (isPressed && departureCoordinates && destinationCoordinates) {
      navigation.push("Riders", {
        departureCoordinates,
        destinationCoordinates,
      });
      setIsPressed(false);
    } else if (startError || destinationError) {
      setIsPressed(false);
    }
  }, [
    isPressed,
    JSON.stringify(departureCoordinates),
    JSON.stringify(destinationCoordinates),
  ]);

  const validateLocations = () => {
    fetchStart();
    fetchDestination();
    setIsPressed(true);
  };

  return (
    <ScrollView>
      <InputDetails type="joinRide" {...inputDetailsProps} />
      <View style={{ marginLeft: 10, marginRight: 10 }} pointerEvents="auto">
        <TouchableOpacity
          style={styles.ridersListButton}
          onPress={() => validateLocations()}
        >
          <Text style={{ color: "#595959", fontSize: 20 }}>
            Search For Drivers
          </Text>
        </TouchableOpacity>
        {(startError || destinationError) && (
          <Text>
            {startError ? "Invalid starting location" : "Invalid destination"}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const StartRide = ({ inputDetailsProps, navigation }) => {
  return (
    <View>
      <InputDetails type="startRide" {...inputDetailsProps} />
      <View style={[styles.confirmButtonView]} pointerEvents="auto">
        <TouchableOpacity style={styles.confirmButton} onPress={() => {}}>
          <Text style={{ color: "white", fontSize: 20 }}>Confirm Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const NewRide = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  const inputDetailsProps = {
    navigation,
    startLocation,
    setStartLocation,
    destinationLocation,
    setDestinationLocation,
    date,
    setDate,
    numberOfSeats,
    setNumberOfSeats,
  };

  const { firstName } = useContext(AuthenticationContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "JoinRide", title: "Join a Ride" },
    { key: "StartRide", title: "Start a New Ride" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "JoinRide":
        return (
          <JoinRide
            inputDetailsProps={inputDetailsProps}
            navigation={navigation}
          />
        );
      case "StartRide":
        return (
          <StartRide
            inputDetailsProps={inputDetailsProps}
            navigation={navigation}
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
    <View style={styles.mainDiv}>
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
          Where to, {firstName}?
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
  mainDiv: {
    flex: 1,
    backgroundColor: "white",
  },
  ridersListButtonView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  ridersListButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ccf2ff",
    // borderTopRightRadius: 100,
    // borderBottomRightRadius: 100,
    borderColor: "grey",
    flexDirection: "row",
    borderRadius: 10,
  },
  background: {
    height: 200,
    width: "100%",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
