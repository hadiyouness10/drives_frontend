import {
  Text,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "routes/authentication-context";
import { useChatsQuery } from "api/queries/chats/get-all-chats-query";

export const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { id, firstName } = useContext(AuthenticationContext);
  const { data: chatsList } = useChatsQuery(1);
  function navigateToChat(chatId, firstName, lastName) {
    navigation.push("Chat", { chatId, firstName, lastName });
  }

  useEffect(() => {
    if (chatsList) {
      setChats(chatsList);
    }
  }, [chatsList]);

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
        {chats.map((chat) => {
          return (
            <View key={chat.ID}>
              <TouchableOpacity
                onPress={() =>
                  navigateToChat(chat.chatID, chat.firstName, chat.lastName)
                }
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
                      {chat.firstName} {chat.lastName}
                    </Text>
                    <Text style={{ color: "#666666" }}>{chat.message}</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: "auto",
                      marginRight: 10,
                      marginTop: 20,
                    }}
                  >
                    <Text>{chat.time.substring(0, chat.time.length - 3)}</Text>
                    <Text>{chat.date.split("T")[0].replace(/-/g, "/")}</Text>
                  </View>
                </View>
                <View style={styles.drawLine}></View>
              </TouchableOpacity>
            </View>
          );
        })}
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
