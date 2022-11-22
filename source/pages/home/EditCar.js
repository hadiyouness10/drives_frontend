import {  React, useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useUserCarQuery } from "api/queries/users/user-car-query";
import { useUpdateCarMutation } from "api/mutations/users/update-car-mutation";
import { AuthenticationContext } from "routes/authentication-context";
import { ImageBackground } from "react-native-web";
import Icon from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
import { useAddCarMutation } from "api/mutations/users/add-car-mutation";

export const EditCar = ({ navigation, route }) => {

  const {
    insert
  } = route?.params;

const [description, setDescription] = useState("");
const [model, setModel] = useState("")
const [number, setNumber] = useState("")
const [color, setColor] = useState("")

const { userId } = useContext(AuthenticationContext);
const {data} = useUserCarQuery(userId)
const {mutate: updateCar, isSuccess:carUpdated} = useUpdateCarMutation();
const {mutate: addCar, isSuccess: carAdded} = useAddCarMutation();

useEffect(() => {
    if (data !== undefined) {
      setModel(data?.model ? data.model : "");
      setNumber(data?.number ? data.number : "");
      setColor(data?.color ? data.color : "");
      setDescription(data?.description ? data.description : "");
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (carUpdated) navigation.goBack();
  }, [carUpdated]);

  useEffect(() => {
    if (carAdded) navigation.goBack();
  }, [carAdded]);
  
  const onSave = () => {
    console.log(insert)
    if (
      model.length == 4 &&
      number.length >1 &&
      number.length <8 &&
      isNaN(number[0]) &&
      !isNaN(number.substring(1)) &&
      color.length<10 &&
      color.length>2 &&
      description.length < 200
    ) {
      console.log("saving data")
      //safe to update data
      var data = {
        studentId: userId,
        model,
        number,
        color,
        description,
      };
      insert ? addCar(data) : updateCar(data);
    }
    //else do nothing
  };

return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
        </View>
        <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            Car Model
          </Text>
          <TextInput
            style={
              model.length !== 4 || isNaN(model)
                ? { borderWidth: 1, borderColor: "red" }
                : { borderWidth: 0 }
            }
            value={model}
            onChangeText={(text) => setModel(text)}
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            Car Number
          </Text>
          <TextInput
            style={
              number.length < 2 || number.length > 7 || !isNaN(number[0]) || isNaN(number.substring(1))
                ? { borderWidth: 1, borderColor: "red" }
                : { borderWidth: 0 }
            }
            value={number}
            onChangeText={(text) => setNumber(text)}
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            Car Color
          </Text>
          <TextInput
            style={
              color.length<3|| color.length>10 || !isNaN(color)
                ? { borderWidth: 1, borderColor: "red" }
                : { borderWidth: 0 }
            }
            value={color}
            onChangeText={(text) => setColor(text)}
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
            Description
          </Text>
          <TextInput
            style={
              description.length>200
                ? { borderWidth: 0 }
                : { borderWidth: 1, borderColor: "red" }
            }
            value={description}
            onChangeText={(text) => setDescription(text)}
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
