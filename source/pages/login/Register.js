import React, { useEffect,useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "core";
import { emailValidator, passwordValidator, nameValidator } from "utils";
import PhoneInput from 'react-native-phone-number-input'
import { ScrollView } from "react-native-gesture-handler";
import DatePicker from "react-native-datepicker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
import {useCampusesQuery, useUniversitiesQuery} from "api/queries";
import { useCreateUserMutation } from "api/mutations/authentication/create-user-mutation";
import { AuthenticationContext } from "routes/authentication-context";

export const Register = ({ navigation }) => {

  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({value:""})
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [password, setPassword] = useState({ value: "", error: "" });
  const [university, setUniversity] = useState({value:"",label:""});
  const [campus, setCampus] = useState({value:"",label:""});
  const [universities, setUniversities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [Focus, setFocus] = useState(false);
  const [CampusFocus, setCampusFocus] = useState(false);

  const { data: uniQ } = useUniversitiesQuery();
  const { 
    data: campusQ,     
    refetch: fetchStart,
  } = useCampusesQuery(university.value);
  const { mutate: createUser, data:registered } = useCreateUserMutation();

  const { signIn } = useContext(AuthenticationContext);

  useEffect(() => {
      if(uniQ){
        let dropDownData = [];
        for (var i = 0; i < uniQ.length; i++) {
          dropDownData.push({ value: uniQ[i].ID, label: uniQ[i].name }); // Create your array of data
        }
        setUniversities(dropDownData)
      }
      
      if(registered){
        signIn(registered.accessToken, registered.userId, firstName.value, lastName.value);
        navigation.navigate("Home")
      }

  }, [registered]);

  const updateCampuses = async () => {   
    if(campusQ){
      let dropDownData2 = [];
      for (var i = 0; i < campusQ.length; i++) {
        dropDownData2.push({ value: campusQ[i].ID, label: campusQ[i].name }); // Create your array of data
      }
      setCampuses(dropDownData2)
    }
  };

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
      lastname:lastName.value,
      universityEmail: email.value,
      phonenumber:phoneNumber.value,
      dateOfBirth:birthDate,
      campusid:campus.value,
      password: password.value,
    };
    createUser(newUser);
}
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <ScrollView>
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
          setPhoneNumber({value:text});
        }}
        withDarkTheme
        withShadow
        disableArrowIcon
      />
      <DatePicker
          style={styles.datePickerStyle}
          date={birthDate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="2019-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setBirthDate(date);
          }}
        />
      <Dropdown
          data={universities}
          style={[styles.dropdown, Focus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!Focus ? 'Select University' : '...'}
          searchPlaceholder="Search..."
          value={university.label}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={item => {
            setUniversity(item);
            fetchStart()
            updateCampuses();
            setFocus(false);
          }}
          renderLeftIcon={() => (
              <AntDesign
                  style={styles.icon}
                  color={Focus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
              />
          )}
      />
          <Dropdown
          data={campuses}
          style={[styles.dropdown, CampusFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!CampusFocus ? 'Select Campus' : '...'}
          searchPlaceholder="Search..."
          value={campus.label}
          onFocus={() => setCampusFocus(true)}
          onBlur={() => setCampusFocus(false)}
          onChange={item => {
            setCampus(item);
            setCampusFocus(false);
          }}
          renderLeftIcon={() => (
              <AntDesign
                  style={styles.icon}
                  color={CampusFocus ? 'blue' : 'black'}
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
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    marginTop: 20

},
icon: {
    marginRight: 5,
},
label: {
    position: 'absolute',
    backgroundColor: 'white',
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
