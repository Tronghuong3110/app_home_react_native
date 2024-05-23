import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Logo from "./logo";
import { createUser } from "../../../lib/appwrite";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("sign-in");
  };

  const handleSignUp = () => {
    const checkCreateUser = createUser(name, phoneNumber);
    if (checkCreateUser) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "home",
            params: [name, phoneNumber],
          },
        ],
      });
    }
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

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Họ và tên"
          onChangeText={setName}
          keyboardType="ascii-capable"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(251,251,223,255)",
    justifyContent: "center",
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

export default SignUp;
