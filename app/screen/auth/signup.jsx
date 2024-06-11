import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import Logo from "./logo";
import base64 from "react-native-base64";
import images from "@/constants/images";
import Loading from "@/components/loading/loading";
import { createUser, checkExistsPhoneNumber } from "../../../lib/appwrite";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setpassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const handleLogin = () => {
    navigation.navigate("sign-in");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const updatetPass = (value) => {
    setpassword(base64.encode(value));
  };

  const handleSignUp = async () => {
    setSpinner(true);
    const checkPhoneNumber = await checkExistsPhoneNumber(phoneNumber, null);
    if(checkPhoneNumber != null) {
      setSpinner(false);
      alert("Số điện thoại đã tồn tại, vui lòng thay đổi số điện thoại mới !!");
      return;
    }
    const checkCreateUser = await createUser(name, phoneNumber, password);
    setSpinner(false);
    if (checkCreateUser != {}) {
      alert("Đăng ký tài khoản thành công !!");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "home",
            params: [name, phoneNumber, checkCreateUser.id],
          },
        ],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Loading spinnerDefault={spinner} />
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

          <TextInput
            style={styles.input}
            value={name}
            placeholder="Họ và tên"
            onChangeText={setName}
            keyboardType="ascii-capable"
          />

          {/* input pass */}
          <View style={[styles.inputPass]}>
            <TextInput
              style={styles.input}
              secureTextEntry={!passwordVisible}
              placeholder="Mật khẩu"
              onChangeText={updatetPass}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.toggleIcon}
            >
              <Image
                source={passwordVisible ? images.hiden_pass : images.view_pass}
                style={styles.toggleImage}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
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
    paddingTop: 10,
  },
  scroll: {
    height: "100%",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    marginTop: 250,
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
  inputPass: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  toggleImage: {
    width: 25,
    height: 25,
  },
});

export default SignUp;
