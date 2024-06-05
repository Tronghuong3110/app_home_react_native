import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Logo from "../auth/logo";
import { checkExistsPhoneNumber } from "@/lib/appwrite";
import { useNavigation } from "@react-navigation/native";
import Loading from '../../../components/loading/loading';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [spinner, setSpinner] = useState(false);
  
  const navigation = useNavigation();
  const handleLogin = async () => {
    if (phoneNumber == "") {
      alert("Vui lòng nhập đẩy đủ thông tin!!");
      return;
    } 
    setSpinner(!spinner);
    const user = await checkExistsPhoneNumber(phoneNumber);
    setSpinner(false);
    if (user == null) {
      alert("Số điện thoại không đúng!!");
    } else {
      console.log(user.role)
      const route = {
        name: user.role == "USER" ? "home" : "home-admin",
        // name: user.role == "USER" ? "home-admin" : "home",
        params: [user.name, phoneNumber, user.id],
      };
      navigation.reset({
        index: 0,
        routes: [
          route
        ],
      });
    }
  };

  const handelSignUp = () => {
    navigation.navigate("sign-up");
  };

  return (
    <View style={styles.container}>
      <Loading spinnerDefault = {spinner}/>
      <ScrollView style={styles.scroll}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Số điện thoại"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handelSignUp}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(251,251,223,255)",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  scroll: {
    height: "100%",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    // marginBottom: -50,
    // position: "relative",
    // // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "rgba(251,251,223,255)",
    // zIndex: 1,
  },
  formContainer: {
    marginTop: 250
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1, 
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    backgroundColor: "#2196f3",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
