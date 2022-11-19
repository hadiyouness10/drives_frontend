import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthenticationContext } from "routes/authentication-context";
import { CommonActions } from "@react-navigation/native";
import { useContext } from "react";
import client from "api/client";

export const Account = ({ navigation }) => {
  const { signOut } = useContext(AuthenticationContext);
  function navigateToInbox() {
    navigation.push("Chats");
  }
  const Logout = async () => {
    try {
      await client.delete("/logout");
    } catch (error) {
      console.log(error);
    }
    await AsyncStorage.removeItem("authentication");
    signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Start" }],
      })
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{
          flex: 1,
          width: null,
          height: 250,
          borderRadius: 10,
          marginBottom: 100,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{
              height: 150,
              width: 159,
              borderRadius: 10,
              marginTop: 300,
            }}
            source={require("../../assets/MyPicture.png")}
          />
          <Text style={styles.nameTitle}>Hadi Youness</Text>
          <Pressable style={styles.editProfile}>
            <View>
              <Text style={{ fontSize: 16, color: "#7D7BFF" }}>
                Edit Profile
              </Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
      <View style={styles.mainDiv}>
        <View>
          <View style={styles.drawLine} />
          <View style={styles.optionsObject}>
            <Text style={styles.options}>Privacy Settings</Text>
            <Icon style={styles.icons} name="settings-outline" size={24} />
          </View>
        </View>
        <View>
          <View style={styles.drawLine} />
          <View style={styles.optionsObject}>
            <Text style={styles.options}>Notifications</Text>
            <Icon style={styles.icons} name="notifications" size={24} />
          </View>
        </View>
        <View>
          <View style={styles.drawLine} />
          <View style={styles.optionsObject}>
            <Text style={styles.options}>Ride History</Text>
            <Icon style={styles.icons} name="list" size={24} />
          </View>
        </View>
        <View>
          <View style={styles.drawLine} />
          <TouchableOpacity onPress={() => navigateToInbox()}>
            <View style={styles.optionsObject}>
              <Text style={styles.options}>Inbox</Text>
              <MaterialCommunityIcons
                style={styles.icons}
                name="inbox"
                size={24}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={Logout}>
          <View style={styles.drawLine} />
          <View style={styles.optionsObject}>
            <Text style={styles.options}>Log Out</Text>
            <MaterialCommunityIcons
              style={styles.icons}
              name="logout"
              color={"darkred"}
              size={24}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    marginTop: 30,
  },
  editProfile: {
    fontSize: 28,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "gray",
    marginBottom: 20,
  },
  nameTitle: {
    fontSize: 28,
    margin: 20,
    fontWeight: "600",
  },
  options: {
    marginTop: 10,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: "400",
  },
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 20,
    borderBottomWidth: 0.4,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  icons: {
    marginTop: 10,
    paddingRight: 20,
    fontSize: 25,
  },
  optionsObject: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
