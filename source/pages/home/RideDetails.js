import { useRef, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MapComponent } from "components";
import { useRideDetailsQuery, useUserDetailsQuery } from "api/queries";
import { dateTimeFormatter } from "utils";
import { Rating } from "react-native-ratings";
import UserAvatar from "react-native-user-avatar";
import SkeletonContent from "react-native-skeleton-content";

const DetailView = ({ label, icon, children }) => {
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
        {children}
      </View>
    </View>
  );
};

const CustomSkeletonContent = ({ style }) => (
  <SkeletonContent
    containerStyle={{ flexShrink: 1 }}
    isLoading={true}
    layout={[style || { height: 20, width: 120 }]}
  />
);

export const RideDetails = ({ route, navigation }) => {
  const { rideID, driverID, pageIndex } = route?.params;
  // const { userID } = useContext(AuthenticationContext);
  const { data: rideDetails, isLoading: rideDetailsLoading } =
    useRideDetailsQuery(rideID);
  const { data: driverDetails, isLoading: driverDetailsLoading } =
    useUserDetailsQuery(driverID);

  const isLoading = useMemo(
    () => rideDetailsLoading || driverDetailsLoading,
    [rideDetailsLoading, driverDetailsLoading]
  );

  const {
    departureLocation,
    destinationLocation,
    departureCoordinates,
    destinationCoordinates,
    dateOfDeparture,
  } = rideDetails ?? {};

  const { firstName, lastName, rating, completedRides } = driverDetails ?? {};

  const date = new Date(dateOfDeparture);

  const mapRef = useRef(null);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 20, paddingTop: 50 }}>
        <TouchableOpacity
          disabled={isLoading}
          style={{ flexDirection: "row", marginBottom: 20 }}
          onPress={() =>
            navigation.push(
              pageIndex == 0 ? "Driver Details" : "Driver Details (Your Rides)",
              { driverDetails }
            )
          }
        >
          {isLoading ? (
            <CustomSkeletonContent
              style={{ height: 90, width: 90, borderRadius: 45 }}
            />
          ) : (
            <UserAvatar
              size={90}
              name={""}
              src={
                "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80"
              }
            />
          )}
          {isLoading ? (
            <SkeletonContent
              containerStyle={[
                styles.driverDetails,
                { justifyContent: "space-between" },
              ]}
              isLoading={true}
              layout={[
                {
                  height: 35,
                  width: 200,
                },
                {
                  height: 20,
                  width: 80,
                },
                {
                  height: 20,
                  width: 100,
                },
              ]}
            />
          ) : (
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
          )}
          <SimpleLineIcons
            name="arrow-right"
            color="grey"
            size={30}
            style={{ marginLeft: "auto", alignSelf: "center" }}
          />
        </TouchableOpacity>
        <DetailView label="Date of Departure" icon="time-outline">
          {isLoading ? (
            <CustomSkeletonContent />
          ) : (
            <Text style={{ fontSize: 18 }}>
              {dateTimeFormatter(date, "date")} at{" "}
              {dateTimeFormatter(date, "time")}
            </Text>
          )}
        </DetailView>
        <DetailView label="Starting Location" icon="location-outline">
          {isLoading ? (
            <CustomSkeletonContent />
          ) : (
            <Text style={{ fontSize: 18 }}>{departureLocation}</Text>
          )}
        </DetailView>
        <DetailView label="Destination" icon="location">
          {isLoading ? (
            <CustomSkeletonContent />
          ) : (
            <Text style={{ fontSize: 18 }}>{destinationLocation}</Text>
          )}
        </DetailView>

        <Button title="Request Pickup" disabled={isLoading} />
      </View>
      {isLoading ? (
        <CustomSkeletonContent style={{ height: "100%", width: "100%" }} />
      ) : (
        <MapComponent
          mapRef={mapRef}
          initialRegion={departureCoordinates}
          startLocationMarker={departureCoordinates}
          destinationMarker={destinationCoordinates}
          initialDelta={{
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  driverDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
});
