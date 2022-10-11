import React from "react";
import PropTypes from "prop-types";
import { Text, View, FlatList, Dimensions, StyleSheet } from "react-native";
import Androw from "react-native-androw";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import { isIPhoneXFamily } from "@freakycoder/react-native-helpers";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const ASPECT_RATIO = ScreenWidth / ScreenHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapCardView = (props) => {
  const {
    data,
    width,
    title,
    height,
    styles,
    markers,
    mapStyle,
    markerLat,
    markerLng,
    titleStyle,
    listHeight,
    borderColor,
    shadowStyle,
    shadowColor,
    borderLeftWidth,
    backgroundColor,
    mapInitialRegion,
  } = props;

  renderRiderCard = (list, index) => {
    const { item } = list;
    return (
      <View key={index} style={{ marginTop: 3 }}>
        <RiderCard name={item.name} source={item.source} {...props} />
      </View>
    );
  };

  return (
    <Androw style={shadowStyle || _shadowStyle(shadowColor)}>
      <View
        style={
          styles ||
          _container(
            height,
            width,
            borderColor,
            borderLeftWidth,
            backgroundColor
          )
        }
      >
        <Androw style={_styles.mapContainer}>
          <MapView
            liteMode
            initialRegion={mapInitialRegion}
            style={mapStyle || _styles.mapStyle}
          >
            {markers || (
              <Marker
                coordinate={{ latitude: markerLat, longitude: markerLng }}
              />
            )}
          </MapView>
        </Androw>
        <View style={_styles.listContainer}>
          <Text style={titleStyle || _styles.titleStyle}>{title}</Text>
          <View style={_styles.listContainerGlue}>
            <FlatList
              style={_listStyle(listHeight)}
              renderItem={renderRiderCard}
              keyExtractor={(item, index) => item.name}
              data={data && data.length > 0 && data}
            />
          </View>
        </View>
      </View>
    </Androw>
  );
};

MapCardView.propTypes = {
  title: PropTypes.string,
  shadowColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MapCardView.defaultProps = {
  height: 150,
  listHeight: 85,
  shadowColor: "#ccc",
  borderLeftWidth: 5,
  markerLat: LATITUDE,
  markerLng: LONGITUDE,
  title: "Testimonial",
  borderColor: "#f54242",
  backgroundColor: "#fff",
  width: ScreenWidth * 0.9,
  mapInitialRegion: INITIAL_REGION,
};

export const _shadowStyle = (shadowColor) => ({
  shadowColor,
  shadowOpacity: 0.7,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  alignItems: "center",
  justifyContent: "center",
});

const _listStyle = (height) => ({
  height,
  borderWidth: 0,
  borderColor: "transparent",
  width: isIPhoneXFamily() ? "60%" : "55%",
});

const _container = (
  height,
  width,
  borderColor,
  borderLeftWidth,
  backgroundColor
) => ({
  width,
  height,
  borderColor,
  borderLeftWidth,
  backgroundColor,
  borderRadius: 24,
  flexDirection: "row",
});

const _styles = StyleSheet.create({
  mapContainer: {
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ccc",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  mapStyle: {
    width: 125,
    height: 125,
    borderRadius: 24,
  },
  listContainer: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 12,
  },
  listContainerGlue: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleStyle: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "600",
  },
});

export default MapCardView;
