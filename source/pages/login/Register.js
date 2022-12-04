import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity,  Keyboard
} from "react-native";
import { Text } from "react-native-paper";
import { theme } from "core";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  dateTimeFormatter,
} from "utils";
import PhoneInput from "react-native-phone-number-input";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
import { useCampusesQuery, useUniversitiesQuery } from "api/queries";
import { useCreateUserMutation } from "api/mutations/authentication/create-user-mutation";
import { AuthenticationContext } from "routes/authentication-context";

export const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "" });
  const [birthDate, setBirthDate] = useState(new Date("2000-01-01"));
  const [password, setPassword] = useState({ value: "", error: "" });
  const [university, setUniversity] = useState({ value: "", label: "" });
  const [campus, setCampus] = useState({ value: "", label: "" });
  const [universities, setUniversities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [Focus, setFocus] = useState(false);
  const [CampusFocus, setCampusFocus] = useState(false);
  const [dateTimePickerShown, setDateTimePickerShown] = useState(null);

  const { data: uniQ } = useUniversitiesQuery();
  const { data: campusQ, refetch: fetchCampuses } = useCampusesQuery(
    university.value
  );
  const { mutate: createUser, data: registered } = useCreateUserMutation();

  const { signIn } = useContext(AuthenticationContext);

  useEffect(() => {
    if (uniQ) {
      setUniversities(uniQ?.map((uni) => ({ value: uni.ID, label: uni.name })));
    }
  }, [JSON.stringify(uniQ)]);

  useEffect(() => {
    setCampuses(
      campusQ?.map((campus) => ({ value: campus.ID, label: campus.name }))
    );
  }, [JSON.stringify(campusQ)]);

  useEffect(() => {
    if (registered) {
      signIn(
        registered.accessToken,
        registered.userId,
        firstName.value,
        lastName.value
      );
      navigation.navigate("Home");
    }
  }, [JSON.stringify(registered)]);

  const RegisterClicked = async () => {
    const firstnameError = nameValidator(firstName.value);
    const lastnameError = nameValidator(lastName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || firstnameError || lastnameError) {
      setFirstName({ ...firstName, error: firstnameError });
      setLastName({ ...lastName, error: lastnameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const newUser = {
      firstname: firstName.value,
      lastname: lastName.value,
      universityEmail: email.value,
      phonenumber: phoneNumber.value,
      dateOfBirth: birthDate.toISOString().substring(0, 10),
      campusid: campus.value,
      password: password.value,
    };
    createUser(newUser);
    console.log("hello");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo mode="Register" />
      {dateTimePickerShown && Platform.OS === "android" && (
        <DateTimePicker
          value={birthDate}
          mode={dateTimePickerShown}
          onChange={(e, selectedDate) => {
            setBirthDate(selectedDate);
            setDateTimePickerShown(null);
          }}
        />
      )}
      <ScrollView keyboardShouldPersistTaps='handled' style={{ width: "100%" }}>
        <TextInput
          label="First Name"
          returnKeyType="next"
          value={firstName.value}
          onChangeText={(text) => setFirstName({ value: text, error: "" })}
          error={!!firstName.error}
          errorText={firstName.error}
        />
        <TextInput
          label="Last Name"
          returnKeyType="next"
          value={lastName.value}
          onChangeText={(text) => setLastName({ value: text, error: "" })}
          error={!!lastName.error}
          errorText={lastName.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <PhoneInput
          // ref={phoneInput}
          defaultValue={phoneNumber.value}
          defaultCode="LB"
          onChangeFormattedText={(text) => {
            setPhoneNumber({ value: text });
          }}
          withDarkTheme
          withShadow
          disableArrowIcon
        />

        {Platform.OS === "ios" ? (
          <DateTimePicker
            style={{ width: 120, marginLeft: 30 }}
            themeVariant="light"
            value={birthDate}
            mode={"date"}
            onChange={(e, selectedDate) => {
              setBirthDate(selectedDate);
              setDateTimePickerShown(null);
            }}
          />
        ) : (
          <TouchableOpacity
            style={[styles.buttonDiv, { marginRight: 10 }]}
            onPress={() => setDateTimePickerShown("date")}
          >
            <Text style={styles.buttonText}>
              {dateTimeFormatter(birthDate, "date")}
            </Text>
          </TouchableOpacity>
        )}

        <Dropdown
          data={universities}
          style={[styles.dropdown, Focus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!Focus ? "Select University" : "..."}
          searchPlaceholder="Search..."
          value={university}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(item) => {
            setUniversity(item);
            fetchCampuses();
            setFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={Focus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
        <Dropdown
          data={campuses}
          style={[styles.dropdown, CampusFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!CampusFocus ? "Select Campus" : "..."}
          searchPlaceholder="Search..."
          value={campus}
          onFocus={() => setCampusFocus(true)}
          onBlur={() => setCampusFocus(false)}
          onChange={(item) => {
            setCampus(item);
            setCampusFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={CampusFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </ScrollView>
      <Button
        mode="contained"
        onPress={RegisterClicked}
        style={{ marginTop: 24 }}
      >
        Register
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 20,
  },
  link: {
    fontWeight: "bold",
    color: '#1D67E2',
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 20,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
