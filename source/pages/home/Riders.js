import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { RideView } from "components";
import { useRidesQuery } from "api/queries";

export const Riders = ({ navigation }) => {
  const { data } = useRidesQuery();
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
              numberOfRiders,
            } = ride;
            return (
              <RideView
                key={ID}
                id={ID}
                driverID={studentId}
                dateOfDeparture={dateOfDeparture}
                departureCoordinates={departureCoordinates}
                pricePerRider={pricePerRider}
                numberOfRiders={numberOfRiders}
                navigation={navigation}
              />
            );
          })}
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
