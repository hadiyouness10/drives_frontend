import { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MapComponent } from "components";

export const RideDetails = ({ navigation }) => {
  const mapRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 20, paddingTop: 50 }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.push("Rider Details")}
        >
          <View style={styles.profilePic}></View>
          <View style={styles.driverDetails}>
            <Text style={{ fontSize: 34 }}>John Doe</Text>
            <Text style={{ fontSize: 16 }}>Rating: 4.5/5</Text>
            <Text style={{ fontSize: 16 }}>Previous rides: 3</Text>
          </View>
          <SimpleLineIcons
            name="arrow-right"
            color="grey"
            size={30}
            style={{ marginLeft: "auto", alignSelf: "center" }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Icon name="time-outline" size={24} style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 18 }}>
            Leaving on Monday, July 3rd at 7:55 AM
          </Text>
        </View>
        <Button title="Request Pickup" />
      </View>
      <MapComponent mapRef={mapRef} />
      <TouchableOpacity style={styles.message}>
        <MaterialCommunityIcons
          name="message"
          size={25}
          color="rgb(0, 125, 200)"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    backgroundColor: "grey",
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  driverDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
  message: {
    position: "absolute",
    backgroundColor: "white",
    right: 30,
    padding: 13,
    borderRadius: 30,
    elevation: 2,
    zIndex: 1,
    bottom: 95,
  },
});
