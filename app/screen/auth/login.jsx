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

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    // checkExistsPhoneNumber(phoneNumber, function (name) {
    //   console.log(name);
    //   // if (phoneNumber == "") {
    //   //   alert("Vui lòng nhập đẩy đủ thông tin!!");
    //   //   // return;
    //   // } else if (name == null) {
    //   //   alert("Số điện thoại không đúng!!");
    //   // } else {
    //   //   navigation.reset({
    //   //     index: 0,
    //   //     routes: [
    //   //       {
    //   //         name: "home",
    //   //         params: [name, phoneNumber],
    //   //       },
    //   //     ],
    //   //   });
    //   // }
    // });
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "home-admin",
          params: ["Huong", phoneNumber]
        }
      ]
    })
  };

  const handelSignUp = () => {
    navigation.navigate("sign-up");
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "",
    backgroundColor: "rgba(251,251,223,255)",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    // marginBottom: -50,
  },
  formContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    // marginTop: -200
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
