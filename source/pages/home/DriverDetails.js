import { React } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useUserPhotoQuery } from "api/queries/users/user-photo-query";
import { Rating } from "react-native-ratings";
import { Reviews } from "components/home/Reviews";

export const DriverDetails = ({ route }) => {
  const {
    driverDetails: {
      firstName,
      lastName,
      rating,
      completedRides,
      numberOfReviews,
    },
    driverId,
  } = route?.params;
  const { data: image } = useUserPhotoQuery(driverId);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          marginTop: 40,
        }}
      >
        <View style={styles.driverDetails}>
          <UserAvatar
            size={150}
            name={`${firstName} ${lastName}`}
            component={
              image ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                  }}
                />
              ) : undefined
            }
          />
          <Text
            style={{ fontSize: 30, marginTop: 10 }}
          >{`${firstName} ${lastName}`}</Text>
          <Rating
            type="star"
            startingValue={rating}
            ratingCount={5}
            imageSize={25}
            readonly={true}
          />
          <Text
            style={{
              fontSize: 20,
              color: "gray",
              marginVertical: 10,
            }}
          >
            Description
          </Text>
        </View>
        <View style={styles.container}>
          <View style={{ width: "33%", alignItems: "flex-start" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>{completedRides}</Text>
              <Text style={styles.labels}>Rides</Text>
            </View>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>{rating}</Text>
              <Text style={styles.labels}>Rating</Text>
            </View>
          </View>
          <View style={{ width: "33%", alignItems: "flex-end" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>{numberOfReviews}</Text>
              <Text style={styles.labels}>Reviews</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 200 }}>
          <Reviews studentId={2} />
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
});
