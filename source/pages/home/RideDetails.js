import { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MapComponent } from "components";

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
export const RideDetails = ({ navigation }) => {
  const mapRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 20, paddingTop: 50 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", marginBottom: 20 }}
          onPress={() => navigation.push("Rider Details")}
        >
          <View style={styles.profilePic}></View>
          <View style={styles.driverDetails}>
            <Text style={{ fontSize: 34 }}>John Doe</Text>
            <Text style={{ fontSize: 16 }}>Rating: 4.5/5</Text>
            <Text style={{ fontSize: 16 }}>Previous Rides: 3</Text>
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
          value="Monday, July 3rd at 7:55 AM"
          icon="time-outline"
        />
        <DetailView
          label="Starting Location"
          value="Mazraa, Beirut"
          icon="location-outline"
        />
        <DetailView label="Destination" value="LAU Byblos" icon="location" />

        <Button title="Request Pickup" />
      </View>
      <MapComponent mapRef={mapRef} />
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
});
