import { useContext, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MapComponent } from "components";
import { useRideDetailsQuery, useUserDetailsQuery } from "api/queries";
import { dateTimeFormatter } from "utils";
import { Rating } from "react-native-ratings";
import UserAvatar from "react-native-user-avatar";
import { decode } from "@mapbox/polyline";

const DetailView = ({ label, value, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 20,
      }}
    >
      <Icon name={icon} size={24} style={{ marginRight: 5 }} />
      <View>
        <Text style={{ fontSize: 12, color: "grey" }}>{label}</Text>
        <Text style={{ fontSize: 18 }}>{value}</Text>
      </View>
    </View>
  );
};
export const RideDetails = ({ route, navigation }) => {
  const { rideId, driverId, pageIndex } = route?.params;
  const { data: rideDetails } = useRideDetailsQuery(rideId);
  const { data: driverDetails } = useUserDetailsQuery(driverId);

  const {
    departureLocation,
    destinationLocation,
    departureCoordinates,
    destinationCoordinates,
    dateOfDeparture,
    route: routePolyline,
  } = rideDetails ?? {};

  const { firstName, lastName, rating, completedRides } = driverDetails ?? {};
  const date = new Date(dateOfDeparture);

  const mapRef = useRef(null);
  if (rideDetails && driverDetails)
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "white", padding: 20, paddingTop: 50 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 20 }}
            onPress={() =>
              navigation.push(
                pageIndex == 0
                  ? "Driver Details"
                  : "Driver Details (Your Rides)",
                { driverDetails }
              )
            }
          >
            <UserAvatar
              size={90}
              name={""}
              src={
                "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80"
              }
            />
            <View style={styles.driverDetails}>
              <Text style={{ fontSize: 34 }}>{`${firstName} ${lastName}`}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16 }}>Rating: </Text>
                <Rating
                  type="star"
                  startingValue={rating}
                  ratingCount={5}
                  imageSize={20}
                  readonly={true}
                />
              </View>
              <Text style={{ fontSize: 16 }}>
                Completed Rides: {completedRides}
              </Text>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              color="grey"
              size={30}
              style={{ marginLeft: "auto", alignSelf: "center" }}
            />
          </TouchableOpacity>
          <DetailView
            label="Date of Departure"
            value={
              dateOfDeparture
                ? `${dateTimeFormatter(date, "date")} at ${dateTimeFormatter(
                    date,
                    "time"
                  )}`
                : ""
            }
            icon="time-outline"
          />
          <DetailView
            label="Starting Location"
            value={departureLocation}
            icon="location-outline"
          />
          <DetailView
            label="Destination"
            value={destinationLocation}
            icon="location"
          />

          <Button title="Request Pickup" />
        </View>
        <MapComponent
          mapRef={mapRef}
          initialRegion={{
            longitude:
              (departureCoordinates.longitude +
                destinationCoordinates.longitude) /
              2,
            latitude:
              (departureCoordinates.latitude +
                destinationCoordinates.latitude) /
              2,
          }}
          startLocationMarker={departureCoordinates}
          destinationMarker={destinationCoordinates}
          initialDelta={{
            latitudeDelta:
              Math.abs(
                departureCoordinates.latitude - destinationCoordinates.latitude
              ) * 1.75,
            longitudeDelta:
              Math.abs(
                departureCoordinates.longitude -
                  destinationCoordinates.longitude
              ) * 1.75,
          }}
          route={decode(routePolyline).map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }))}
        />
      </View>
    );
  else return <Text>Loading</Text>;
};

const styles = StyleSheet.create({
  driverDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
});
