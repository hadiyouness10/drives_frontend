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
import { useChatsQuery, useUserPhotoQuery } from "api/queries";
import { dateTimeFormatter } from "utils";
import UserAvatar from "react-native-user-avatar";

const ChatCard = ({
  ID,
  driverId,
  driverFirstName,
  driverLastName,
  riderId,
  riderFirstName,
  riderLastName,
  message,
  date,
  userId,
  navigation,
}) => {
  const dateTime = new Date(date);
  const { data: chatImage } = useUserPhotoQuery(
    userId === driverId ? riderId : driverId
  );
  return (
    <TouchableOpacity
      onPress={() => {
        if (userId === driverId)
          navigation.push("Chat", {
            chatId: ID,
            firstName: riderFirstName,
            lastName: riderLastName,
            receiverId: riderId,
          });
        else
          navigation.push("Chat", {
            chatId: ID,
            firstName: driverFirstName,
            lastName: driverLastName,
            receiverId: driverId,
          });
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
        <View style={{ width: 65, height: 65, margin: 12, marginRight: 0 }}>
          <UserAvatar
            size={65}
            name={
              userId === driverId
                ? `${riderFirstName} ${riderLastName}`
                : `${driverFirstName} ${driverLastName}`
            }
            component={
              chatImage ? (
                <Image
                  source={{ uri: chatImage }}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 35,
                  }}
                />
              ) : undefined
            }
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
  );
};

export const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { userId } = useContext(AuthenticationContext);
  const { data: chatsList } = useChatsQuery({ studentId: userId });

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
        {chats.map((chat) => (
          <ChatCard
            key={chat.ID}
            {...chat}
            userId={userId}
            navigation={navigation}
          />
        ))}
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
