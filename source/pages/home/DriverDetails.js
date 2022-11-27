import { useRef, React, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from "components/home/CarouselCardItem";
import UserAvatar from "react-native-user-avatar";
import { Rating } from "react-native-ratings";
import { TextInput } from "react-native-paper";
import { useGetReviewsQuery } from "api/queries/reviews/review-query";
import { Comments } from "components/home/Comments";
import { Reviews } from "components/home/Reviews";

export const DriverDetails = ({ route }) => {
  const {
    driverDetails: {
      firstName,
      lastName,
      rating,
      email,
      completedRides,
      numberOfReviews,
    },
  } = route?.params;

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
            name={""}
            src={
              "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80"
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
