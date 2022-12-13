import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useGetNotificationsQuery } from "api/queries/notifications/get-notifications-query";

export const Notifications = ({ navigation }) => {
  var id = 1;
  const [notifications, setNotifications] = useState([
    { title: "lkdfjd", message: "dksfl" },
  ]);
  const { data } = useGetNotificationsQuery(id);
  useEffect(() => {
    setNotifications(data);
  }, [data]);

  return (
    <View style={{ height: "100%", paddingTop: 70 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Notifications</Text>
      </View>
      <View>
        <ScrollView>
          {notifications?.map((notification) => {
            return (
              <View
                style={{
                  width: "90%",
                  borderRadius: 10,
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text
                    style={{
                      width: "50%",
                      marginLeft: 10,
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {notification.title}
                  </Text>
                  <View style={{ width: "50%", alignSelf: "flex-end" }}>
                    <Icon
                      name={"cancel"}
                      size={24}
                      color={"black"}
                      style={{ alignSelf: "flex-end", marginRight: 15 }}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    marginTop: 5,
                    marginLeft: 10,
                    fontSize: 14,
                    marginBottom: 15,
                  }}
                >
                  {notification.message}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 20,
    borderBottomWidth: 0.8,
    width: "100%",
  },
});
