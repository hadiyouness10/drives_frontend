import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import { dateTimeFormatter } from "utils";
import { useChatsQuery, useUserDetailsQuery } from "api/queries";
import {
  useCreateChatMutation,
  useUpdateStopRequestMutation,
} from "api/mutations";
import { AuthenticationContext } from "routes/authentication-context";

const Detail = ({ title, icon, value }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Icon name={icon} size={20} color="#404040" style={{ marginRight: 10 }} />
    <View>
      <Text style={{ color: "grey", fontSize: 12 }}>{title}</Text>
      <Text style={{ fontSize: 13 }}>{value} </Text>
    </View>
  </View>
);

export const StopRequestView = ({
  navigation,
  ID,
  coordinates,
  dateOfRequest,
  location,
  rideId,
  studentId,
  userId,
}) => {
  const { data: { firstName, lastName } = { firstName: "", lastName: "" } } =
    useUserDetailsQuery(studentId);
  const { mutate } = useUpdateStopRequestMutation();
  const { mutate: createChat, isSuccess: createChatSuccess } =
    useCreateChatMutation();
  const { firstName: driverFirstName } = useContext(AuthenticationContext);
  const { refetch: fetchChatsList } = useChatsQuery({
    isDriver: true,
    riderId: studentId,
    driverId: userId,
    autofetch: false,
    navigation,
    createChat,
    rideId,
    firstName: driverFirstName,
    receiverId: studentId,
  });

  useEffect(() => {
    if (createChatSuccess)
      navigation.navigate("Account", {
        screen: "Chats",
        initial: false,
      });
  }, [createChatSuccess]);

  if (!firstName) return <View />;
  else
    return (
      <View style={styles.stopRequestView}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.mapContainer}>
            <MapView
              liteMode
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.12,
                longitudeDelta: 0.08,
              }}
              style={styles.mapStyle}
              toolbarEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
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
            <RiderCard name={`${firstName} ${lastName}`} />
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                marginTop: -5,
                height: 110,
              }}
            >
              <Detail title="Pickup Location" icon="credit" value={location} />
              <Detail
                title="Date of Request"
                icon="calendar"
                value={dateTimeFormatter(new Date(dateOfRequest), "short-date")}
              />
              <Detail
                title="Time of Request"
                icon="clock"
                value={dateTimeFormatter(new Date(dateOfRequest))}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 5,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={styles.buttonDiv}
            onPress={() => {
              navigation.push("Ride Details (Account)", {
                rideId,
                driverId: userId,
              });
            }}
          >
            <Text style={styles.buttonText}>View Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDiv}
            onPress={() => {
              fetchChatsList();
            }}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "100%", flex: 1 }}>
            <TouchableOpacity
              style={[styles.buttonDiv, { backgroundColor: "green" }]}
              onPress={() =>
                mutate({
                  id: ID,
                  content: {
                    newStatus: "ACCEPTED",
                    rideId,
                    riderId: studentId,
                  },
                })
              }
            >
              <IonIcon name="checkmark" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonDiv, { backgroundColor: "darkred" }]}
              onPress={() =>
                mutate({
                  id: ID,
                  content: {
                    newStatus: "REJECTED",
                    rideId,
                    riderId: studentId,
                  },
                })
              }
            >
              <IonIcon name="ios-close-outline" color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  stopRequestView: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 24,
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
    height: 150,
  },
  buttonDiv: {
    flex: 1,
    height: 40,
    backgroundColor: "rgb(0, 125, 200)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    elevation: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
  },
});
