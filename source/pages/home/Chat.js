import {
  Text,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { AuthenticationContext } from "routes/authentication-context";
import { sendMessageQuery, useChatQuery } from "api/queries";
import { useSendMessageMutation } from "api/mutations";

export const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { id, firstName } = useContext(AuthenticationContext);
  const { data: messagesList } = useChatQuery(1);
  const { mutate } = useSendMessageMutation();
  const sendMessage = (message) => {
    const data = {
      studentId: 1,
      chatID: 1,
      message: message[0]["text"],
    };
    mutate(data);
  };
  const getUser = () => {
    return {
      _id: 1,
      name: firstName,
      avatar: "",
    };
  };
  const chatterName = "Khaled Jalloul";

  useEffect(() => {
    console.log("updated message list");
    if (messagesList)
      setMessages((previous) =>
        GiftedChat.append(previous.message, messagesList)
      );
  }, [messagesList]);

  const chat = (
    <GiftedChat
      messages={messages}
      onSend={(message) => sendMessage(message)}
      user={getUser()}
    />
  );
  if (Platform.OS === "android") {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled
      >
        {chat}
      </KeyboardAvoidingView>
    );
  }
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
          {chatterName}
        </Text>
      </View>
      {chat}
    </View>
  );
};

const styles = StyleSheet.create({});
