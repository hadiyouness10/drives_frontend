import { useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MapComponent } from "components";
import {
  useRideDetailsQuery,
  useStopRequestsQuery,
  useUserDetailsQuery,
} from "api/queries";
import { dateTimeFormatter } from "utils";
import { Rating } from "react-native-ratings";
import UserAvatar from "react-native-user-avatar";
import { decode } from "@mapbox/polyline";
import {
  useCreateChatMutation,
  useDeleteRideMutation,
  useDeleteStopRequestMutation,
  useStopRequestMutation,
  useUpdateRideMutation,
} from "api/mutations";
import { AuthenticationContext } from "routes/authentication-context";
import { useChatsQuery } from "api/queries/chats/get-all-chats-query";
import { useUserPhotoQuery } from "api/queries/users/user-photo-query";

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
  stopRequests,
}) => {
  const { mutate: sendStopRequest, data: stopRequestResult } =
    useStopRequestMutation();
  const { mutate: cancelRide } = useDeleteRideMutation();
  const { mutate: cancelStopRequest } = useDeleteStopRequestMutation();
  const { mutate: updateRide } = useUpdateRideMutation();
  const { data: riderStopRequests } = useStopRequestsQuery({
    isDriver: false,
    studentId: userId,
    rideId,
  });

  useEffect(() => {
    if (stopRequestResult) {
      const now = new Date().toISOString();
      navigation.navigate("Your Rides", {
        screen: "/",
        params: { defaultIndex: 0, date: now },
      });
    }
  }, [JSON.stringify(stopRequestResult)]);

  if (userId === driverId) {
    if (rideDetails.rideStatus === "PENDING") {
      if (rideDetails.numberOfSeats === rideDetails.numberOfAvailableSeats)
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
      else
        return (
          <View style={{ marginBottom: 20 }}>
            <Button
              onPress={() => {
                updateRide({
                  id: rideId,
                  content: {
                    newStatus: "COMPLETED",
                    riderIdArr: stopRequests.map(
                      (stopReq) => stopReq.studentId
                    ),
                  },
                });
                navigation.goBack();
              }}
              color="green"
              title="Mark as Complete"
              style={{ marginBottom: 20 }}
            />
          </View>
        );
    } else return null;
  } else {
    if (rideDetails.rideStatus === "PENDING") {
      if (!stopRequest) {
        if (riderStopRequests && riderStopRequests.length === 0) {
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
        } else return null;
      } else
        return (
          <View style={{ marginBottom: 20 }}>
            <Button
              color="red"
              onPress={() => {
                const { ID, requestStatus, driverId } = stopRequest;
                cancelStopRequest({
                  stopRequestId: ID,
                  requestStatus,
                  rideId,
                  driverId,
                });
                navigation.goBack();
              }}
              title="Cancel Stop Request"
            />
          </View>
        );
    } else return null;
  }
};

const RiderTile = ({ id }) => {
  const { data: userDetails } = useUserDetailsQuery(id);
  const { data: image } = useUserPhotoQuery(id);
  if (!userDetails) return <View />;
  else
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 3,
        }}
      >
        <UserAvatar
          size={40}
          name={`${userDetails.firstName} ${userDetails.lastName}`}
          component={
            image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
            ) : undefined
          }
        />
        <Text
          style={{ fontSize: 16, marginLeft: 10 }}
        >{`${userDetails.firstName} ${userDetails.lastName}`}</Text>
      </View>
    );
};

export const RideDetails = ({ route, navigation }) => {
  const {
    rideId,
    driverId,
    pickupLocation,
    pickupCoordinates,
    stopRequest,
    history,
  } = route?.params;
  const { data: rideDetails } = useRideDetailsQuery(rideId);
  const { data: driverDetails } = useUserDetailsQuery(driverId);
  const { userId, firstName } = useContext(AuthenticationContext);
  const { mutate: createChat, isSuccess: createChatSuccess } =
    useCreateChatMutation();
  const { refetch: fetchChatsList } = useChatsQuery({
    isDriver: false,
    autofetch: false,
    riderId: stopRequest?.studentId || userId,
    driverId,
    navigation,
    createChat,
    rideId,
    firstName,
    receiverId: userId === driverId ? stopRequest?.studentId : driverId,
  });

  const { data: stopRequests } = useStopRequestsQuery({
    isDriver: true,
    studentId: driverId,
    rideId,
    requestStatus: "ACCEPTED",
    rideStatus: history ? "NOT_PENDING" : "PENDING",
  });

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

  const { data: driverImage } = useUserPhotoQuery(driverId);
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
              navigation.push("Driver Details", { driverDetails, driverId })
            }
          >
            <UserAvatar
              size={90}
              name={`${driverFirstName} ${lastName}`}
              component={
                driverImage ? (
                  <Image
                    source={{ uri: driverImage }}
                    style={{
                      width: 91,
                      height: 91,
                      borderRadius: 45,
                    }}
                  />
                ) : undefined
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
          {stopRequests && stopRequests.length !== 0 && (
            <Text style={{ fontSize: 16 }}>Riders: </Text>
          )}
          {stopRequests && stopRequests.length !== 0 && (
            <View style={{ marginVertical: 5 }}>
              {stopRequests.map((stopRequest) => {
                return (
                  <RiderTile key={stopRequest.ID} id={stopRequest.studentId} />
                );
              })}
            </View>
          )}
          <ActionButton
            navigation={navigation}
            userId={userId}
            driverId={driverId}
            rideId={rideId}
            rideDetails={rideDetails}
            pickupLocation={pickupLocation}
            pickupCoordinates={pickupCoordinates}
            stopRequest={stopRequest}
            stopRequests={stopRequests}
          />
          {driverId !== userId && (
            <View style={{ marginBottom: 20 }}>
              <Button
                title="Send Message"
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
