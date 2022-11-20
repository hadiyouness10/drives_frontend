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
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "routes/authentication-context";
import { useUserDetailsQuery } from "api/queries";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useUpdateUserMutation } from "api/mutations/users/update-user-mutation";
import { CommonActions } from "@react-navigation/native";
import UserAvatar from "react-native-user-avatar";

export const EditProfile = ({ navigation }) => {
  var id = 1;
  const { mutate: updateUser } = useUpdateUserMutation();
  var userDetails = useUserDetailsQuery(id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  useEffect(() => {
    if (userDetails.data !== undefined) {
      setFirstName(userDetails.data?.firstName);
      setLastName(userDetails.data?.lastName);
      setPhoneNumber(
        userDetails.data?.phoneNumber ? userDetails.data.phoneNumber : ""
      );
      setDateOfBirth(
        userDetails.data?.dateOfBirth
          ? userDetails.data.dateOfBirth.split("T")[0]
          : ""
      );
    }
  }, []);

  const onSave = () => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phoneNumber.length == 9 &&
      !isNaN(phoneNumber) &&
      checkBirthValidity
    ) {
      //safe to update data
      var data = {
        studentId: id,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
      };
      updateUser(data);
      console.log("saving data!");
      navigation.goBack();
    } else console.log("couldnt save data");
    //else do nothing
  };
  const checkBirthValidity = () => {
    return moment(dateOfBirth.replace(/-/g, "-")).isValid();
  };
  return (
    <View style={{ height: "100%", paddingTop: 70 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>My Profile</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <UserAvatar
            size={120}
            name={""}
            src={
              "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80"
            }
          />
          {/* <Text style={{marginLeft: 20, fontSize: 18, fontWeight: '400'}}>Upload</Text> */}
        </View>
        <View style={{ marginTop: 30, marginLeft: 20, flexDirection: "row" }}>
          <View style={{ width: "45%", marginRight: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
              First Name
            </Text>
            <TextInput
              key={"FirstName"}
              style={
                firstName.length == 0
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
                lastName.length == 0
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
              phoneNumber.length != 9 || isNaN(phoneNumber)
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
