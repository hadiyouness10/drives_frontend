import React from "react";
import PropTypes from "prop-types";
import { Text, View, FlatList, Dimensions, StyleSheet } from "react-native";
import Androw from "react-native-androw";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";

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

const RideView = (props) => {
  const {
    width,
    riderInfo,
    rideInfo,
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
          <View style={_styles.riderinfoStyle}>
            <RiderCard
              name={riderInfo.name}
              source={riderInfo.source}
              {...props}
            />
          </View>

          <View style={_styles.listContainer}>
            <View style={_styles.listContainerGlue}>
              <Icon
                name="user"
                size="20%"
                color="#404040"
                style={{ marginBottom: 10 }}
              />
              <Text style={titleStyle || _styles.titleStyle}>
                {rideInfo.nbofRiders}{" "}
              </Text>
            </View>
            <View style={_styles.listContainerGlue}>
              <Text style={titleStyle || _styles.titleStyle}>
                {rideInfo.price} $
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Androw>
  );
};

RideView.propTypes = {
  title: PropTypes.string,
  shadowColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RideView.defaultProps = {
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
  marginBottom: 10,
});

const _listStyle = (height) => ({
  height,
  borderWidth: 0,
  borderColor: "transparent",
  width: "55%",
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
    flexShrink: 1,
  },
  listContainerGlue: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  riderinfoStyle: {
    marginVertical: 4,
  },
  titleStyle: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "600",
  },
});

export default RideView;
