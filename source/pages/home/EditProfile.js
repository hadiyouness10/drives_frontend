import {
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "routes/authentication-context";
import { useUserDetailsQuery, useUserPhotoQuery } from "api/queries";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useUpdateUserMutation,
  useUpdateUserPhotoMutation,
  useuploadUserLicenseMutation,
} from "api/mutations";
import UserAvatar from "react-native-user-avatar";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export const EditProfile = ({ navigation }) => {
  const {
    userId,
    firstName: defaultFirstName,
    lastName: defaultLastName,
  } = useContext(AuthenticationContext);
  const { mutate: updateUser, isSuccess: isSuccessUser } =
    useUpdateUserMutation();
  const { mutate: updateUserPhoto, isSuccess: isSuccessPhoto } =
    useUpdateUserPhotoMutation();
  const { mutate: uploadUserLicense, isSuccess: isSuccessLicense } =
    useuploadUserLicenseMutation();
  const { data: image } = useUserPhotoQuery(userId);
  var { data } = useUserDetailsQuery(userId);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (data) {
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setPhoneNumber(data?.phoneNumber);
      setDateOfBirth(data?.dateOfBirth ? data.dateOfBirth.split("T")[0] : "");
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (isSuccessLicense) navigation.goBack();
  }, [isSuccessLicense]);

  useEffect(() => {
    if (isSuccessUser) navigation.goBack();
  }, [isSuccessUser]);

  useEffect(() => {
    if (isSuccessPhoto) navigation.goBack();
  }, [isSuccessPhoto]);

  const onSave = () => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phoneNumber.length == 12 &&
      checkBirthValidity
    ) {
      //safe to update data
      var data = {
        id: userId,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
      };
      updateUser(data);
    }
    //else do nothing
  };
  const checkBirthValidity = () => {
    return moment(dateOfBirth.replace(/-/g, "-")).isValid();
  };

  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = new FormData();
      formData.append("base64", JSON.stringify(result.base64));
      updateUserPhoto(formData);
    }
  };

  const uploadDrivingLicense = async () => {
    // No permissions request is necessary for launching the image library
    const permission = await Permissions.getAsync(Permissions.CAMERA);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermission.status === "granted") {
        console.log(newPermission);
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const image = {
        uri:
          Platform.OS === "android"
            ? result.uri
            : result.uri.replace("file://", ""),
        name: result.uri.substring(
          result.uri.lastIndexOf("/") + 1,
          result.uri.length
        ),
        type: `image/${result.uri.substr(result.uri.lastIndexOf(".") + 1)}`,
        id: userId,
      };
      uploadUserLicense(image);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{
          flex: 1,
          width: null,
          height: 150,
          borderRadius: 10,
        }}
      ></ImageBackground>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {/* <Text style={{ fontSize: 20, fontWeight: "500",marginTop:100, }}>My Profile</Text> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <UserAvatar
          size={120}
          name={`${defaultFirstName} ${defaultLastName}`}
          component={
            image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                }}
              />
            ) : undefined
          }
        />
      </View>
      <Button title="Change Photo" onPress={handleChoosePhoto} />
      <ScrollView>
        <View style={{ marginTop: 30, marginLeft: 20, flexDirection: "row" }}>
          <View style={{ width: "45%", marginRight: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
              First Name
            </Text>
            <TextInput
              key={"FirstName"}
              style={
                firstName.length === 0
                  ? { borderWidth: 1, borderColor: "red" }
                  : { borderWidth: 0 }
              }
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View style={{ width: "47%" }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
              Last Name
            </Text>
            <TextInput
              style={
                lastName.length === 0
                  ? { borderWidth: 1, borderColor: "red" }
                  : { borderWidth: 0 }
              }
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            Phone Number
          </Text>
          <TextInput
            style={
              phoneNumber.length !== 12
                ? { borderWidth: 1, borderColor: "red" }
                : { borderWidth: 0 }
            }
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            Date Of Birth
          </Text>
          <TextInput
            style={
              checkBirthValidity()
                ? { borderWidth: 0 }
                : { borderWidth: 1, borderColor: "red" }
            }
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
          />
        </View>

        <View style={{ marginTop: 20, width: "90%", marginLeft: 20 }}>
          <TouchableOpacity
            onPress={() => onSave()}
            style={{ backgroundColor: "green", height: 40, borderRadius: 10 }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: "50%",
                  marginLeft: 20,
                  marginTop: 10,
                  color: "white",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Save
              </Text>
              <View
                style={{ alignItems: "flex-end", width: "50%", marginTop: 4 }}
              >
                <Icon
                  name={"arrow-forward-sharp"}
                  size={30}
                  color={"white"}
                  style={{ marginRight: 30 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            width: "90%",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              uploadDrivingLicense();
            }}
          >
            <Text
              style={{
                borderRadius: 5,
                borderWidth: 2,
                padding: 10,
                borderColor: "#33B6FC",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Upload Driving License
            </Text>
          </TouchableOpacity>
        </View>
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
