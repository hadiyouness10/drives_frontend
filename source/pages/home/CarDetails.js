import { React, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useUserCarQuery } from "api/queries/users/user-car-query";
import { AuthenticationContext } from "routes/authentication-context";
import Icon from "react-native-vector-icons/Ionicons";

const DetailView = ({ label, value, icon, description }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 30,
        marginTop: 30,
      }}
    >
      <Icon name={icon} size={24} style={{ marginRight: "10%" }} />
      <Text style={{ fontSize: 14, color: "grey", marginRight: "10%" }}>
        {label}
      </Text>
      {description ? (
        <Text style={{ fontSize: 14 }}>{value}</Text>
      ) : (
        <Text style={{ fontSize: 16 }}>{value}</Text>
      )}
    </View>
  );
};

export const CarDetails = ({ navigation, route }) => {
  const { userId } = useContext(AuthenticationContext);
  const { data: CarDetails } = useUserCarQuery(userId);

  const { model, number, color, description } = CarDetails ?? {};

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          alignItems: "center",
          marginTop: 40,
          flex: 1,
        }}
      >
        <View style={styles.driverDetails}>
          <Text style={{ fontSize: 30, marginTop: 10 }}>Car Details</Text>
        </View>
        <View style={styles.drawLine} />

        <View>
          <DetailView label="Car model" value={model ?? ""} icon="car" />
          <DetailView
            label="Car Number"
            value={number ? number : ""}
            icon="car"
          />
          <DetailView label="Car Color" value={color ? color : ""} icon="car" />
          <DetailView
            label="Car Description"
            value={description ? description : ""}
            icon="car"
            description={true}
          />
        </View>

        <View style={{ flexDirection: "row", margin: 50 }}>
          <TouchableOpacity
            onPress={() => {
              model && number && color
                ? navigation.push("Edit Car", { insert: false })
                : navigation.push("Edit Car", { insert: true });
            }}
          >
            <Text
              style={{
                borderRadius: 5,
                borderWidth: 2,
                padding: 10,
                borderColor: "#33B6FC",
                fontSize: 20,
                marginRight: 10,
              }}
            >
              {model && number && color ? "Update Car Info" : "Add Car"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  driverDetails: {
    marginLeft: 20,
    padding: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  square: {
    width: "33%",
    alignItems: "center",
  },
  numbers: {
    fontSize: 20,
    fontWeight: "600",
  },
  labels: {
    color: "gray",
    fontWeight: "600",
  },
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 20,
    borderBottomWidth: 0.4,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
});
