import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { RideView } from "components";
import { useRidesQuery } from "api/queries";
import { AuthenticationContext } from "routes/authentication-context";

export const Riders = ({ route, navigation }) => {
  const [orderBy,setOrderBy] = useState("priceperRider")
  const [descending,setDescending] = useState(false)
  const [minPrice,setMinPrice] = useState(null)
  const [maxPrice,setMaxPrice] = useState(null)

  const {
    departureLocation,
    departureCoordinates,
    destinationCoordinates,
    numberOfSeats,
    dateOfDeparture,
    minPricePerRider,
    maxPricePerRider,
  } = route?.params ?? {};
  const { userId } = useContext(AuthenticationContext);
  const { data, isLoading } = useRidesQuery(
    departureCoordinates && destinationCoordinates
      ? {
          pickupCoordinates: JSON.stringify({
            latitude: departureCoordinates.latitude,
            longitude: departureCoordinates.longitude,
          }),
          destinationCoordinates: JSON.stringify({
            latitude: destinationCoordinates.latitude,
            longitude: destinationCoordinates.longitude,
          }),
          minPrice,
          maxPrice,
          orderBy,
          descending,
          numberOfSeats,
          dateOfDeparture: dateOfDeparture.toISOString(),
          searcherId: userId,
          minPricePerRider: parseFloat(minPricePerRider) || 0,
          maxPricePerRider: parseFloat(maxPricePerRider) || 100,
        }
      : {}
  );
  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, color: "grey" }}>Loading...</Text>
      </View>
    );
  else if (data.length === 0)
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
          There are no rides that match the given criteria.
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
          Available Rides
        </Text>
        <ScrollView>
          {data.map((ride) => {
            const {
              ID,
              studentId,
              dateOfDeparture,
              pricePerRider,
              numberOfSeats,
              numberOfAvailableSeats,
            } = ride;
            return (
              <RideView
                key={ID}
                ID={ID}
                studentId={studentId}
                dateOfDeparture={dateOfDeparture}
                pickupLocation={departureLocation}
                pickupCoordinates={departureCoordinates}
                departureCoordinates={ride.departureCoordinates}
                pricePerRider={pricePerRider}
                numberOfSeats={numberOfSeats}
                numberOfAvailableSeats={numberOfAvailableSeats}
                navigation={navigation}
                request={true}
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
