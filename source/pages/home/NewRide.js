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
import { HowItWorks } from "components/home/HowItWorks";

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
      isPressed &&
      (inputDetailsProps.startCoordinates || departureCoordinates) &&
      (inputDetailsProps.destinationCoordinates || destinationCoordinates)
    ) {
      navigation.push("Riders", {
        departureCoordinates:
          inputDetailsProps.startCoordinates || departureCoordinates,
        destinationCoordinates:
          inputDetailsProps.destinationCoordinates || destinationCoordinates,
      });
      setIsPressed(false);
    } else if (startError || destinationError) setIsPressed(false);
  }, [
    isPressed,
    JSON.stringify(departureCoordinates),
    JSON.stringify(destinationCoordinates),
  ]);

  const validateLocations = () => {
    if (!inputDetailsProps.startCoordinates && !departureCoordinates)
      fetchStart();
    if (!inputDetailsProps.destinationCoordinates && !departureCoordinates)
      fetchDestination();
    setIsPressed(true);
  };

  return (
    <View>
      <View>
        <InputDetails type="joinRide" {...inputDetailsProps} />
        <View style={{ marginLeft: 10, marginRight: 10 }} pointerEvents="auto">
          <TouchableOpacity
            style={styles.ridersListButton}
            onPress={() => validateLocations()}
          >
            <Text style={{ color: "#ffffff", fontSize: 20 }}>
              Search For Drivers
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30 }}>
            <HowItWorks type="joinRide"></HowItWorks>
          </View>
        </View>
      </View>
    </View>
  );
};

const StartRide = ({ inputDetailsProps, navigation }) => {
  return (
    <View>
      <ScrollView>
        <InputDetails type="startRide" {...inputDetailsProps} />
        <View style={[styles.confirmButtonView]} pointerEvents="auto">
          <TouchableOpacity style={styles.confirmButton} onPress={() => {}}>
            <Text style={{ color: "white", fontSize: 20 }}>Confirm Ride</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30 }}>
            <HowItWorks type="startRide"></HowItWorks>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const NewRide = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [date, setDate] = useState(new Date());
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [universityField, setUniversityField] = useState("destination");

  useEffect(
    (oldUniversityField) => {
      if (oldUniversityField !== universityField) {
        const temp = startLocation;
        setStartLocation(destinationLocation);
        setDestinationLocation(temp);
        const temp2 = startCoordinates;
        setStartCoordinates(destinationCoordinates);
        setDestinationCoordinates(temp2);
      }
    },
    [universityField]
  );

  const inputDetailsProps = {
    navigation,
    startLocation,
    setStartLocation,
    destinationLocation,
    setDestinationLocation,
    startCoordinates,
    setStartCoordinates,
    destinationCoordinates,
    setDestinationCoordinates,
    date,
    setDate,
    numberOfSeats,
    setNumberOfSeats,
    universityField,
    setUniversityField,
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
