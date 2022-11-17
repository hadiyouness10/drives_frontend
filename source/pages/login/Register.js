import React, { useEffect, useContext,useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
import { theme } from "core";
import { emailValidator, passwordValidator, nameValidator } from "utils";
import { AuthenticationContext } from "routes/authentication-context";
import client from "api/client";
import PhoneInput from 'react-native-phone-number-input'
import { ScrollView } from "react-native-gesture-handler";
import DatePicker from "react-native-datepicker";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';

export const Register = ({ navigation }) => {

  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({value:""})
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [password, setPassword] = useState({ value: "", error: "" });
  const [university, setUniversity] = useState(null);
  const [campus, setCampus] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [Focus, setFocus] = useState(false);
  const [CampusFocus, setCampusFocus] = useState(false);

  useEffect(() => {
    const getUniversities = async () => {
      try {
        await client.get('/authentication/universities').then(res =>{
          let dropDownData = [];
          for (var i = 0; i < res.data.length; i++) {
            dropDownData.push({ value: res.data[i].ID, label: res.data[i].name }); // Create your array of data
        }
          setUniversities(dropDownData)
          console.log(universities)
        });
        
    } catch (error) {}};
    getUniversities();
  }, []);

  const getUniversityCampuses = async (id) => {
    try {
      await client.get(`/authentication/${id}/campuses`).then(res =>{
        console.log(res.data)
        let dropDownData = [];
          for (var i = 0; i < res.data.length; i++) {
            dropDownData.push({ value: res.data[i].ID, label: res.data[i].name }); // Create your array of data
        }
          setCampuses(dropDownData)
          console.log(campuses)
      });
  } catch (error) {}
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

    try {
        await client.post('/authentication/register', {
            firstname: firstName.value,
            lastname:lastName.value,
            email: email.value,
            phonenumber:phoneNumber.value,
            birthdate:birthDate,
            campusid:campus,
            password: password.value,
        }).then(res =>{
          console.log(res.data)
          // Login logic will get us the ID and name of the user
          navigation.navigate("Login");
        });
        
    } catch (error) {
      
    }
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
          value={university}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={item => {
            setUniversity(item.label);
            getUniversityCampuses(item.value);
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
          value={campus}
          onFocus={() => setCampusFocus(true)}
          onBlur={() => setCampusFocus(false)}
          onChange={item => {
            setCampus(item.value);
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
