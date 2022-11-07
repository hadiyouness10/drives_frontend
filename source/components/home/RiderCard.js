import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";

const RiderCard = (props) => {
  const { name, source, size, colors, imageStyle, textStyle } = props;
  return (
    <View style={styles.container}>
      <UserAvatar
        size={size}
        name={name}
        src={source}
        colors={colors}
        style={imageStyle || styles.imageStyle}
      />
      <Text numberOfLines={1} style={textStyle || styles.textStyle}>
        {name}
      </Text>
    </View>
  );
};

RiderCard.propTypes = {
  size: PropTypes.string,
  colors: PropTypes.array,
};

RiderCard.defaultProps = {
  colors: ["#b888a0", "#ccc", "#e36259", "#ccaabb", "#b888a0"],
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
  textStyle: {
    marginLeft: 12,
    fontSize: 18,
  },
});
export default RiderCard;
