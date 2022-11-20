import { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MapComponent } from "components";
import { useRideDetailsQuery, useUserDetailsQuery } from "api/queries";
import { dateTimeFormatter } from "utils";
import { Rating } from "react-native-ratings";
import UserAvatar from "react-native-user-avatar";
import { decode } from "@mapbox/polyline";
import {
  useCreateChatMutation,
  useDeleteRideMutation,
  useDeleteStopRequestMutation,
  useStopRequestMutation,
} from "api/mutations";
import { AuthenticationContext } from "routes/authentication-context";
import { useChatsQuery } from "api/queries/chats/get-all-chats-query";

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

const ActionButton = ({
  navigation,
  userId,
  driverId,
  rideId,
  rideDetails,
  pickupLocation,
  pickupCoordinates,
  stopRequest,
}) => {
  const { mutate: sendStopRequest, data: stopRequestResult } =
    useStopRequestMutation();
  const { mutate: cancelRide } = useDeleteRideMutation();
  const { mutate: cancelStopRequest } = useDeleteStopRequestMutation();

  useEffect(() => {
    if (stopRequestResult) {
      const now = new Date().toISOString();
      navigation.navigate("Your Rides", {
        screen: "/",
        params: { defaultIndex: 0, date: now },
      });
    }
  }, [JSON.stringify(stopRequestResult)]);

  if (
    userId === driverId &&
    rideDetails.numberOfSeats === rideDetails.numberOfAvailableSeats
  )
    return (
      <View style={{ marginBottom: 20 }}>
        <Button
          color="red"
          onPress={() => {
            cancelRide(rideId);
            navigation.goBack();
          }}
          title="Cancel Ride"
          style={{ marginBottom: 20 }}
        />
      </View>
    );
  else if (userId !== driverId)
    if (!stopRequest) {
      return (
        <View style={{ marginBottom: 20 }}>
          <Button
            onPress={() => {
              sendStopRequest({
                rideId,
                studentId: userId,
                driverId,
                location: pickupLocation,
                coordinates: JSON.stringify(pickupCoordinates),
              });
            }}
            title="Request Pickup"
          />
        </View>
      );
    } else {
      return (
        <View style={{ marginBottom: 20 }}>
          <Button
            color="red"
            onPress={() => {
              const { ID, requestStatus } = stopRequest;
              cancelStopRequest({ stopRequestId: ID, requestStatus, rideId });
              navigation.goBack();
            }}
            title="Cancel Stop Request"
          />
        </View>
      );
    }
  else return null;
};

export const RideDetails = ({ route, navigation }) => {
  const {
    rideId,
    driverId,
    pageIndex,
    pickupLocation,
    pickupCoordinates,
    stopRequest,
  } = route?.params;
  const { data: rideDetails } = useRideDetailsQuery(rideId);
  const { data: driverDetails } = useUserDetailsQuery(driverId);
  const { userId, firstName } = useContext(AuthenticationContext);
  const { mutate: createChat, isSuccess: createChatSuccess } =
    useCreateChatMutation();
  const {
    data: chatsList,
    refetch: fetchChatsList,
    isFetching,
  } = useChatsQuery(userId, false, navigation, createChat, rideId, firstName);

  const {
    departureLocation,
    destinationLocation,
    departureCoordinates,
    destinationCoordinates,
    dateOfDeparture,
    route: routePolyline,
  } = rideDetails ?? {};

  const {
    firstName: driverFirstName,
    lastName,
    rating,
    completedRides,
  } = driverDetails ?? {};
  const date = new Date(dateOfDeparture);

  const mapRef = useRef(null);

  useEffect(() => {
    if (createChatSuccess)
      navigation.navigate("Account", {
        screen: "Chats",
        initial: false,
      });
  }, [createChatSuccess]);

  if (rideDetails && driverDetails)
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingTop: 50,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 5 }}
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
              <Text
                style={{ fontSize: 34 }}
              >{`${driverFirstName} ${lastName}`}</Text>
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
          <View style={styles.drawLine}></View>

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
          <ActionButton
            navigation={navigation}
            userId={userId}
            driverId={driverId}
            rideId={rideId}
            rideDetails={rideDetails}
            pickupLocation={pickupLocation}
            pickupCoordinates={pickupCoordinates}
            stopRequest={stopRequest}
          />
          {driverId !== userId && (
            <View style={{ marginBottom: 20 }}>
              <Button
                title="Chat"
                onPress={() => {
                  fetchChatsList();
                }}
              />
            </View>
          )}
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
  else
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, color: "grey" }}>Loading...</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  driverDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
  drawLine: {
    borderBottomColor: "black",
    marginTop: 10,
    borderBottomWidth: 0.4,
    width: "95%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 10,
  },
});
