import { useRef, React } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from "components/home/CarouselCardItem";
import UserAvatar from "react-native-user-avatar";
import { useUserPhotoQuery } from "api/queries/users/user-photo-query";

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
    driverId,
  } = route?.params;
  const { data: image } = useUserPhotoQuery(driverId);
  const mapRef = useRef(null);
  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
  ];
  const isCarousel = useRef(null);
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
          <Text
            style={{
              fontSize: 20,
              color: "gray",
              width: "100%",
              marginVertical: 10,
            }}
          >
            Description
          </Text>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <TouchableOpacity>
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
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  borderRadius: 5,
                  borderWidth: 2,
                  padding: 10,
                  borderColor: "#33B6FC",
                  fontSize: 20,
                }}
              >
                View Rides
              </Text>
            </TouchableOpacity>
          </View>
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
        <View style={{ height: 220 }}>
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={data}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            sliderHeight={100}
            // onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
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
});
