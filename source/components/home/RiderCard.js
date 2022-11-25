import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useUserPhotoQuery } from "api/queries/users/user-photo-query";

const RiderCard = (props) => {
  const { id, name, size } = props;
  const { data: image } = useUserPhotoQuery(id);
  return (
    <View style={styles.container}>
      <UserAvatar size={size || 36} name={name} src={image} />
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
