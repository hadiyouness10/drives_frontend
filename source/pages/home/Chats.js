import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthenticationContext } from "routes/authentication-context";
import { useChatsQuery } from "api/queries/chats/get-all-chats-query";
import { dateTimeFormatter } from "utils";

export const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { userId } = useContext(AuthenticationContext);
  const { data: chatsList } = useChatsQuery(userId);

  function navigateToChat(chatId, firstName, lastName) {
    navigation.push("Chat", { chatId, firstName, lastName });
  }

  useEffect(() => {
    if (chatsList) {
      setChats(chatsList);
    }
  }, [JSON.stringify(chatsList)]);

  return (
    <View style={{ height: "100%" }}>
      <View style={{ backgroundColor: "#E0E0E0", justifyContent: "center" }}>
        <Text
          style={{
            marginTop: 50,
            fontSize: 20,
            fontWeight: "600",
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          Inbox
        </Text>
      </View>
      <ScrollView>
        {chats.map(
          ({
            ID,
            driverId,
            driverFirstName,
            driverLastName,
            riderId,
            riderFirstName,
            riderLastName,
            message,
            date,
          }) => {
            const dateTime = new Date(date);
            return (
              <View key={ID}>
                <TouchableOpacity
                  onPress={() => {
                    if (userId === driverId)
                      navigateToChat(ID, riderFirstName, riderLastName);
                    else navigateToChat(ID, driverFirstName, driverLastName);
                  }}
                >
                  <View
                    style={{
                      height: 70,
                      alignContent: "center",
                      margin: "auto",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: 50, margin: 10 }}>
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: "https://picsum.photos/200" }}
                      />
                    </View>
                    <View style={{ margin: 20 }}>
                      <Text style={{ fontSize: 18, fontWeight: "500" }}>
                        {userId === driverId ? riderFirstName : driverFirstName}{" "}
                        {userId === driverId ? riderLastName : driverLastName}
                      </Text>
                      <Text style={{ color: "#666666" }}>{message}</Text>
                    </View>
                    <View
                      style={{
                        marginLeft: "auto",
                        marginRight: 10,
                        marginTop: 20,
                      }}
                    >
                      <Text>{dateTimeFormatter(dateTime, "date")}</Text>
                      <Text style={{ textAlign: "right" }}>
                        {dateTimeFormatter(dateTime, "time")}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.drawLine}></View>
                </TouchableOpacity>
              </View>
            );
          }
        )}
      </ScrollView>
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
