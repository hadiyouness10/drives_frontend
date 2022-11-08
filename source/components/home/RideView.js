import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";
import { dateTimeFormatter } from "utils";
import { useUserDetailsQuery } from "api/queries";
import SkeletonContent from "react-native-skeleton-content";

const Detail = ({ title, icon, children }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Icon name={icon} size={20} color="#404040" style={{ marginRight: 10 }} />
    <View>
      <Text style={{ color: "grey", fontSize: 12 }}>{title}</Text>
      {children}
    </View>
  </View>
);

export const RideView = ({
  id,
  driverID,
  dateOfDeparture,
  pricePerRider,
  numberOfRiders,
  departureCoordinates,
  navigation,
  pageIndex = 0,
  displayDriver = true,
}) => {
  const {
    data: { firstName, lastName } = { firstName: "", lastName: "" },
    isLoading,
  } = useUserDetailsQuery(driverID);
  if (displayDriver && isLoading) return <LoadingRideView />;
  else
    return (
      <TouchableOpacity
        style={styles.rideView}
        onPress={() =>
          navigation.push(
            pageIndex === 0 ? "Ride Details" : "Ride Details (Your Rides)",
            { rideID: id, driverID, pageIndex }
          )
        }
      >
        <View style={styles.mapContainer}>
          <MapView
            liteMode
            initialRegion={{
              latitude: departureCoordinates.latitude,
              longitude: departureCoordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapStyle}
            toolbarEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: departureCoordinates.latitude,
                longitude: departureCoordinates.longitude,
              }}
            />
          </MapView>
        </View>

        <View
          style={{
            flex: 1,
            margin: 15,
            marginRight: 25,
            marginLeft: 15,
          }}
        >
          {displayDriver && <RiderCard name={`${firstName} ${lastName}`} />}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: displayDriver
                  ? "space-between"
                  : "space-around",
              }}
            >
              <Detail title="Date" icon="calendar">
                <Text style={{ fontSize: 13 }}>
                  {dateTimeFormatter(new Date(dateOfDeparture), "short-date")}{" "}
                </Text>
              </Detail>
              <Detail title="Time" icon="clock">
                <Text style={{ fontSize: 13 }}>
                  {dateTimeFormatter(new Date(dateOfDeparture))}
                </Text>
              </Detail>
            </View>
            <View
              style={{
                justifyContent: displayDriver
                  ? "space-between"
                  : "space-around",
              }}
            >
              <Detail title="Price" icon="credit">
                <Text style={{ fontSize: 13 }}>{`${pricePerRider} $`}</Text>
              </Detail>
              <Detail title="Riders" icon="user">
                <Text style={{ fontSize: 13 }}>{`${numberOfRiders} $`}</Text>
              </Detail>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
};

const CustomSkeletonContent = ({ style }) => (
  <SkeletonContent
    containerStyle={{ flexShrink: 1 }}
    isLoading={true}
    layout={[style || { height: 20, width: 30 }]}
  />
);

export const LoadingRideView = ({ displayDriver = true }) => {
  return (
    <View style={styles.rideView}>
      <CustomSkeletonContent
        style={{
          width: 125,
          height: 140,
          marginLeft: 10,
          borderRadius: 14,
        }}
      />

      <View
        style={{
          flexGrow: 1,
          margin: 15,
          marginRight: 25,
          marginLeft: 15,
        }}
      >
        {displayDriver && (
          <SkeletonContent
            containerStyle={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
            isLoading={true}
            layout={[
              {
                height: 36,
                width: 36,
                borderRadius: 20,
              },
              {
                marginLeft: 12,
                height: 20,
                width: 120,
              },
            ]}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: displayDriver ? "space-between" : "space-around",
            }}
          >
            <Detail title="Date" icon="calendar">
              <CustomSkeletonContent style={{ height: 20, width: 60 }} />
            </Detail>
            <Detail title="Time" icon="clock">
              <CustomSkeletonContent style={{ height: 20, width: 60 }} />
            </Detail>
          </View>
          <View
            style={{
              justifyContent: displayDriver ? "space-between" : "space-around",
            }}
          >
            <Detail title="Price" icon="credit">
              <CustomSkeletonContent />
            </Detail>
            <Detail title="Riders" icon="user">
              <CustomSkeletonContent />
            </Detail>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rideView: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 24,
    height: 160,
    marginTop: 5,
    marginBottom: 15,
    alignItems: "center",
    elevation: 4,
  },
  mapContainer: {
    marginLeft: 10,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mapStyle: {
    width: 125,
    height: 140,
    borderColor: "black",
  },
});
