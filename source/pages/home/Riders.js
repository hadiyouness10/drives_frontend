import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { LoadingRideView, RideView } from "components";
import { useRidesQuery } from "api/queries";

export const Riders = ({ navigation }) => {
  const { data, isLoading } = useRidesQuery();
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
        {isLoading
          ? [1, 2].map((key) => <LoadingRideView key={key} />)
          : data.map((ride) => (
              <RideView
                key={ride.id}
                id={ride.id}
                driverID={ride.driverID}
                dateOfDeparture={ride.dateOfDeparture}
                departureCoordinates={ride.departureCoordinates}
                pricePerRider={ride.pricePerRider}
                numberOfRiders={ride.numberOfRiders}
                navigation={navigation}
              />
            ))}
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
