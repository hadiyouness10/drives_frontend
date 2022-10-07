import { useRef, React } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from "components/home/CarouselCardItem";
export const RiderDetails = () => {
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
          <View style={styles.profilePic}></View>
          <Text style={{ fontSize: 30 }}>John Doe</Text>
          <Text style={{ fontSize: 20, color: "gray", width: "100%" }}>
            4th year computer engineering student
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
              <Text style={styles.numbers}>33</Text>
              <Text style={styles.labels}>Rides</Text>
            </View>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>3.5</Text>
              <Text style={styles.labels}>Rating</Text>
            </View>
          </View>
          <View style={{ width: "33%", alignItems: "flex-end" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.numbers}>5</Text>
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
  profilePic: {
    backgroundColor: "grey",
    height: 150,
    width: 150,
    borderRadius: 90,
    alignContent: "center",
  },
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
