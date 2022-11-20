import {
  Text,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticationContext } from "routes/authentication-context";
import { useChatQuery } from "api/queries";
import { useSendMessageMutation } from "api/mutations";

export const Chat = ({ route, navigation }) => {
  const {
    chatId,
    firstName: chatterFirstName,
    lastName: chatterLastName,
    receiverId,
  } = route.params;
  const chatterName = chatterFirstName + " " + chatterLastName;
  const [messages, setMessages] = useState([]);
  const { userId, firstName } = useContext(AuthenticationContext);
  const { data: messagesList } = useChatQuery(chatId);
  const { mutate } = useSendMessageMutation(chatId, userId);
  const sendMessage = (message) => {
    const data = {
      studentId: userId,
      chatId,
      message: message[0]["text"],
      receiverId,
    };
    mutate(data);
  };
  const getUser = () => {
    return {
      _id: userId,
      name: firstName,
      avatar: "",
    };
  };

  useEffect(() => {
    if (messagesList)
      setMessages((previous) =>
        GiftedChat.append(previous.message, messagesList)
      );
  }, [JSON.stringify(messagesList)]);

  const chat = (
    <GiftedChat
      messages={messages}
      onSend={(message) => sendMessage(message)}
      user={getUser()}
    />
  );
  if (Platform.OS === "android") {
    return (
      <View style={{ height: "100%" }}>
        <View
          style={{
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              marginTop: 50,
              fontSize: 20,
              fontWeight: "600",
              paddingBottom: 10,
              textAlign: "center",
            }}
          >
            {chatterName}
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "white" }}
          behavior="padding"
          keyboardVerticalOffset={30}
          enabled
        >
          {chat}
        </KeyboardAvoidingView>
      </View>
    );
  } else
    return (
      <View style={{ height: "100%" }}>
        <View
          style={{
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              marginTop: 50,
              fontSize: 20,
              fontWeight: "600",
              paddingBottom: 10,
              textAlign: "center",
            }}
          >
            {chatterName}
          </Text>
        </View>
        {chat}
      </View>
    );
};

const styles = StyleSheet.create({});
