import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";

const RiderCard = (props) => {
  const {
    name,
    source = "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80",
    size,
  } = props;
  return (
    <View style={styles.container}>
      <UserAvatar size={size || 36} name={name} src={source} />
      <Text numberOfLines={1} style={styles.textStyle}>
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
    marginBottom: 10,
  },
  textStyle: {
    marginLeft: 12,
    fontSize: 18,
  },
});
export default RiderCard;
