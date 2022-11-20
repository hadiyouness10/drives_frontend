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
import { AuthenticationContext } from "routes/authentication-context";
import { sendMessageQuery, useChatQuery } from "api/queries";
import { useSendMessageMutation } from "api/mutations";

export const Chat = ({ route, navigation }) => {
  const chatId = route.params?.chatId;
  const chatterName = route.params?.firstName + " " + route.params?.lastName;
  const [messages, setMessages] = useState([]);
  const { userId, firstName } = useContext(AuthenticationContext);
  const { data: messagesList } = useChatQuery(chatId);
  const { mutate } = useSendMessageMutation(chatId, userId);
  const sendMessage = (message) => {
    const data = {
      studentId: userId,
      chatId,
      message: message[0]["text"],
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
        style={{ flex: 1, backgroundColor: "white" }}
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled
      >
        {chat}
      </KeyboardAvoidingView>
    );
  }
  return (
    <View style={{ height: "100%", borderWidth: 1 }}>
      <View
        style={{
          backgroundColor: "#E0E0E0",
          justifyContent: "center",
          borderWidth: 1,
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
