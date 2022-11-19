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
    departureCoordinates,
    destinationCoordinates,
    numberOfSeats,
    dateOfDeparture,
  } = route?.params ?? {};
  const { userId } = useContext(AuthenticationContext);
  const { data } = useRidesQuery(
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
        }
      : {}
  );
  if (data)
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
              departureCoordinates,
              pricePerRider,
              numberOfSeats,
            } = ride;
            return (
              <RideView
                key={ID}
                ID={ID}
                studentId={studentId}
                dateOfDeparture={dateOfDeparture}
                departureCoordinates={departureCoordinates}
                pricePerRider={pricePerRider}
                numberOfSeats={numberOfSeats}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  else return <Text>Loading</Text>;
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
});
