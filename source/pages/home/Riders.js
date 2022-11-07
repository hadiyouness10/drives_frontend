import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { RideView } from "components";
import { useRidesQuery } from "api/queries";

export const Riders = ({ navigation }) => {
  const { data } = useRidesQuery();
  if (data)
    return (
      <View style={styles.mainView}>
        <Text style={{ marginLeft: 26, marginTop: 40, fontSize: 24 }}>
          Available Rides
        </Text>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {data.map((ride) => (
            <RideView
              id={ride.id}
              driverID={ride.driverID}
              dateOfDeparture={ride.dateOfDeparture}
              pricePerRider={ride.pricePerRider}
              numberOfRiders={ride.numberOfRiders}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    );
  else return <View />;
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
});
