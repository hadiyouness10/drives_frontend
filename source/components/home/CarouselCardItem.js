import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.header}>{item.title}</Text>
        <View style={{ width: "50%", alignItems: "flex-end", padding: 10 }}>
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
        </View>
      </View>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 45,
    alignItems: "flex-end",
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "#222",
    fontSize: 15,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
});

export default CarouselCardItem;
