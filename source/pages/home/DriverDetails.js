import { React } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { Rating } from "react-native-ratings";
import { Reviews } from "components/home/Reviews";
import {
  useUserPhotoQuery,
  useReviewOverviewQuery,
  useRideCountQuery,
} from "api/queries";

export const DriverDetails = ({ route }) => {
  const {
    driverDetails: { firstName, lastName },
    driverId,
  } = route?.params;
  const { data: image } = useUserPhotoQuery(driverId);
  const { data: numOfRides } = useRideCountQuery(driverId);
  const { data: reviewOverview } = useReviewOverviewQuery(driverId);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          marginTop: 40,
          flexGrow: 1,
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
            startingValue={reviewOverview?.average}
            ratingCount={5}
            imageSize={25}
            readonly={true}
          />
        </View>
        <View style={styles.container}>
          <View style={{ alignItems: "flex-start" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>{numOfRides?.count}</Text>
              <Text style={styles.labels}>Rides</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>{reviewOverview?.count}</Text>
              <Text style={styles.labels}>Reviews</Text>
            </View>
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Reviews studentId={driverId} />
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
    justifyContent: "space-around",
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
