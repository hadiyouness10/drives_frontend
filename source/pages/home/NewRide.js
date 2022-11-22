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
import { InputDetails, RouteSelector } from "components";
import { AuthenticationContext } from "routes/authentication-context";
import { TabBar, TabView } from "react-native-tab-view";
import { HowItWorks } from "components/home/HowItWorks";
import { useLocationCoordinatesQuery } from "api/queries";
import { useCreateRideMutation } from "api/mutations";
import { useUserCarQuery } from "api/queries/users/user-car-query";
import { useUserLicenseQuery } from "api/queries/users/user-license-query";

const JoinRide = ({ inputDetailsProps, navigation }) => {
  const { data: backUpCoordinates, refetch: fetchCoordinates } =
    useLocationCoordinatesQuery(
      inputDetailsProps.universityField === "start"
        ? inputDetailsProps.destinationLocation
        : inputDetailsProps.startLocation,
      false,
      "joinRide"
    );

  const validateLocations = () => {
    if (
      inputDetailsProps.startCoordinates &&
      inputDetailsProps.destinationCoordinates
    ) {
      navigation.push("Riders", {
        departureLocation: inputDetailsProps.startLocation,
        departureCoordinates: inputDetailsProps.startCoordinates,
        destinationCoordinates: inputDetailsProps.destinationCoordinates,
        dateOfDeparture: inputDetailsProps.date,
        numberOfSeats: inputDetailsProps.numberOfSeats,
        minPricePerRider: inputDetailsProps.minPricePerRider,
        maxPricePerRider: inputDetailsProps.maxPricePerRider,
      });
    } else fetchCoordinates();
  };

  useEffect(() => {
    if (backUpCoordinates)
      if (inputDetailsProps.universityField === "start") {
        inputDetailsProps.setDestinationCoordinates(backUpCoordinates);
        navigation.push("Riders", {
          departureLocation: inputDetailsProps.startLocation,
          departureCoordinates: inputDetailsProps.startCoordinates,
          destinationCoordinates: backUpCoordinates,
          dateOfDeparture: inputDetailsProps.date,
          numberOfSeats: inputDetailsProps.numberOfSeats,
          minPricePerRider: inputDetailsProps.minPricePerRider,
          maxPricePerRider: inputDetailsProps.maxPricePerRider,
        });
      } else {
        inputDetailsProps.setStartCoordinates(backUpCoordinates);
        navigation.push("Riders", {
          departureLocation: inputDetailsProps.startLocation,
          departureCoordinates: backUpCoordinates,
          destinationCoordinates: inputDetailsProps.destinationCoordinates,
          dateOfDeparture: inputDetailsProps.date,
          numberOfSeats: inputDetailsProps.numberOfSeats,
          minPricePerRider: inputDetailsProps.minPricePerRider,
          maxPricePerRider: inputDetailsProps.maxPricePerRider,
        });
      }
  }, [JSON.stringify(backUpCoordinates)]);

  return (
    <ScrollView keyboardShouldPersistTaps={"always"}>
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
    </ScrollView>
  );
};

const StartRide = ({ inputDetailsProps, navigation }) => {
  const { mutate: createRide, data } = useCreateRideMutation();
  const { userId } = useContext(AuthenticationContext);
  const [routeSelectorEnabled, setRouteSelectorEnabled] = useState(false);
  const {data:carDetails} = useUserCarQuery(userId);
  const {data:licenseData} = useUserLicenseQuery(userId);

  const [selectedRoute, setSelectedRoute] = useState(0);

  const { data: backUpCoordinates, refetch: fetchCoordinates } =
    useLocationCoordinatesQuery(
      inputDetailsProps.universityField === "start"
        ? inputDetailsProps.destinationLocation
        : inputDetailsProps.startLocation,
      false,
      "startRide"
    );

  const dateToSend = inputDetailsProps.date.toISOString();
  const newRide = {
    studentId: userId,
    dateOfDeparture: `${dateToSend.substring(0, 10)} ${dateToSend.substring(
      dateToSend.indexOf("T") + 1,
      dateToSend.indexOf("T") + 8
    )}`,
    rideStatus: "PENDING",
    departureCoordinates: JSON.stringify(inputDetailsProps.startCoordinates),
    destinationCoordinates: JSON.stringify(
      inputDetailsProps.destinationCoordinates
    ),
    departureLocation: inputDetailsProps.startLocation,
    destinationLocation: inputDetailsProps.destinationLocation,
    numberOfSeats: inputDetailsProps.numberOfSeats,
    numberOfAvailableSeats: inputDetailsProps.numberOfSeats,
    pricePerRider: parseFloat(inputDetailsProps.pricePerRider) || 0,
  };

  const validateCar = () => {
    if (carDetails && licenseData
    ) {
      console.log("can create car");
      validateLocations();
    } else console.log("access denied");
  };

  const validateLocations = () => {
    if (
      inputDetailsProps.startCoordinates &&
      inputDetailsProps.destinationCoordinates
    ) {
      createRide(newRide);
    } else fetchCoordinates();
  };

  useEffect(() => {
    if (backUpCoordinates)
      if (inputDetailsProps.universityField === "start") {
        inputDetailsProps.setDestinationCoordinates(backUpCoordinates);
        createRide({
          ...newRide,
          destinationCoordinates: JSON.stringify(backUpCoordinates),
        });
      } else {
        inputDetailsProps.setStartCoordinates(backUpCoordinates);
        createRide({
          ...newRide,
          departureCoordinates: JSON.stringify(backUpCoordinates),
        });
      }
  }, [JSON.stringify(backUpCoordinates)]);

  useEffect(() => {
    if (data)
      if (data.status === "SUCCESS") {
        const now = new Date().toISOString();
        navigation.navigate("Your Rides", {
          screen: "/",
          params: { defaultIndex: 1, date: now },
        });
      } else if (data.status === "REQUIRE_ROUTE_SELECTION") {
        setRouteSelectorEnabled(true);
      }
  }, [JSON.stringify(data)]);

  return (
    <ScrollView keyboardShouldPersistTaps={"always"}>
      <InputDetails type="startRide" {...inputDetailsProps} />
      <View style={{ marginHorizontal: 10 }} pointerEvents="auto">
        <TouchableOpacity
          style={styles.ridersListButton}
          onPress={() => validateCar()}
        >
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Create Ride</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 30 }}>
          <HowItWorks type="startRide"></HowItWorks>
        </View>
      </View>
      <RouteSelector
        startCoordinates={inputDetailsProps.startCoordinates}
        destinationCoordinates={inputDetailsProps.destinationCoordinates}
        enabled={routeSelectorEnabled}
        setEnabled={setRouteSelectorEnabled}
        displayedRoute={selectedRoute}
        setDisplayedRoute={setSelectedRoute}
        routes={data?.content}
        createRide={() =>
          createRide({ ...newRide, route: data.content[selectedRoute] })
        }
      />
    </ScrollView>
  );
};

export const NewRide = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [date, setDate] = useState(new Date());
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [pricePerRider, setPricePerRider] = useState("");
  const [minPricePerRider, setMinPricePerRider] = useState("");
  const [maxPricePerRider, setMaxPricePerRider] = useState("");
  const [universityField, setUniversityField] = useState("destination");
  const [updateLocationCoords, setUpdateLocationCoords] = useState(true);

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
    minPricePerRider,
    setMinPricePerRider,
    maxPricePerRider,
    setMaxPricePerRider,
    universityField,
    setUniversityField,
    updateLocationCoords,
    setUpdateLocationCoords,
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
