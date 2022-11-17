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
import { HowItWorks } from "components/home/HowItWorks";
import { useLocationCoordinatesQuery } from "api/queries";
import { useCreateRideMutation } from "api/mutations";

const JoinRide = ({ inputDetailsProps, navigation }) => {
  const { data: backUpCoordinates, refetch: fetchCoordinates } =
    useLocationCoordinatesQuery(
      inputDetailsProps.universityField === "start"
        ? inputDetailsProps.destinationLocation
        : inputDetailsProps.startLocation,
      false
    );

  const validateLocations = () => {
    if (
      inputDetailsProps.startCoordinates &&
      inputDetailsProps.destinationCoordinates
    ) {
      navigation.push("Riders", {
        departureCoordinates: inputDetailsProps.startCoordinates,
        destinationCoordinates: inputDetailsProps.destinationCoordinates,
      });
    } else fetchCoordinates();
  };

  useEffect(() => {
    if (backUpCoordinates)
      if (inputDetailsProps.universityField === "start") {
        inputDetailsProps.setDestinationCoordinates(backUpCoordinates);
        navigation.push("Riders", {
          departureCoordinates: inputDetailsProps.startCoordinates,
          destinationCoordinates: backUpCoordinates,
        });
      } else {
        inputDetailsProps.setStartCoordinates(backUpCoordinates);
        navigation.push("Riders", {
          departureCoordinates: backUpCoordinates,
          destinationCoordinates: inputDetailsProps.destinationCoordinates,
        });
      }
  }, [JSON.stringify(backUpCoordinates)]);

  return (
    <View>
      <View>
        <InputDetails type="joinRide" {...inputDetailsProps} />
        <View style={{ marginHorizontal: 10 }} pointerEvents="auto">
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
  const { mutate: createRide } = useCreateRideMutation();
  const { userID } = useContext(AuthenticationContext);

  const newRide = {
    studentId: userID,
    dateOfDeparture: inputDetailsProps.date.toISOString().slice(0, 10),
    timeOfDeparture: inputDetailsProps.date.toLocaleTimeString().split(" ")[0],
    rideStatus: "PENDING",
    departureCoordinates: JSON.stringify(inputDetailsProps.startCoordinates),
    destinationCoordinates: JSON.stringify(
      inputDetailsProps.destinationCoordinates
    ),
    departureLocation: inputDetailsProps.startLocation,
    destinationLocation: inputDetailsProps.destinationLocation,
    numberOfRiders: inputDetailsProps.numberOfSeats,
    pricePerRider: inputDetailsProps.pricePerRider ?? 0,
  };

  return (
    <View>
      <View>
        <InputDetails type="startRide" {...inputDetailsProps} />
        <View style={{ marginHorizontal: 10 }} pointerEvents="auto">
          <TouchableOpacity
            style={styles.ridersListButton}
            onPress={() => createRide(newRide)}
          >
            <Text style={{ color: "#ffffff", fontSize: 20 }}>Create Ride</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30 }}>
            <HowItWorks type="startRide"></HowItWorks>
          </View>
        </View>
      </View>
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
  const [pricePerRider, setPricePerRider] = useState(1);
  const [universityField, setUniversityField] = useState("destination");

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
    pricePerRider,
    setPricePerRider,
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
    backgroundColor: "rgb(0, 125, 200)",
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
