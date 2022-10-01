import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
  Button,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Account = () => {
  const options_main = [
    {
      icon: <MaterialCommunityIcons name="account-outline" size={24} />,
      title: "My Profile",
    },
    {
      icon: <MaterialCommunityIcons name="wallet-outline" size={24} />,
      title: "My Wallet",
    },
    {
      icon: <Icon name="mail-outline" size={24} />,
      title: "Inbox",
    },
    {
      icon: <Icon name="list" size={24} />,
      title: "My Rides",
    },
    {
      icon: <Icon name="settings-outline" size={24} />,
      title: "Settings",
    },
  ];

  const options_additions = [
    {
      icon: <MaterialCommunityIcons name="head-lightbulb-outline" size={24} />,
      title: "Keep in Mind",
    },
    {
      icon: <Icon name="chatbox-ellipses-outline" size={24} />,
      title: "Contact Us",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{
          flex: 1,
          width: null,
          height: 250,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{ height: 150, width: 159, borderRadius: 5, marginTop: 150 }}
            source={require("../assets/MyPicture.png")}
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
        <View style={styles.options}>
          <FlatList
            data={options_main}
            renderItem={({ item, index }) => {
              const isEnd = index === options_main.length - 1;
              return (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.optionsItem,
                      !isEnd
                        ? { borderBottomWidth: 0.7 }
                        : { borderBottomWidth: 0.7 },
                    ]}
                  >
                    {item.icon}
                    <Text
                      style={{ color: "black", fontSize: 18, marginLeft: 10 }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.options}>
          <FlatList
            data={options_additions}
            renderItem={({ item, index }) => {
              const isEnd = index === options_additions.length - 1;
              return (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.optionsItem,
                      !isEnd ? { borderBottomWidth: 0.3 } : "",
                    ]}
                  >
                    {item.icon}
                    <Text
                      style={{ color: "black", fontSize: 18, marginLeft: 10 }}
                    >
                      {item.title}, {index}, {options_additions.length}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
  },
  editProfile: {
    fontSize: 28,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  nameTitle: {
    fontSize: 28,
    margin: 20,
    fontWeight: "600",
  },
  withdrawButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgb(0, 125, 200)",
    padding: 10,
    borderRadius: 5,
  },
  options: {
    width: "90%",
    backgroundColor: "white",
    elevation: 5,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  optionsItem: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
});
