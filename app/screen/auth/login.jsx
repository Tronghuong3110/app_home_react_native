import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Logo from "../auth/logo";
import base64 from "react-native-base64";
import { checkExistsPhoneNumber } from "@/lib/appwrite";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../../components/loading/loading";
import images from "@/constants/images";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [password, setpassword] = useState("");
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async () => {
    if (phoneNumber == "") {
      alert("Vui lòng nhập đẩy đủ thông tin!!");
      return;
    }
    setSpinner(!spinner);
    const user = await checkExistsPhoneNumber(phoneNumber, password);
    setSpinner(false);
    if (user == null) {
      alert("Số điện thoại hoặc mật khẩu không đúng !!");
    } else {
      const route = {
        name: user.role == "USER" ? "home" : "home-admin",
        // name: user.role == "USER" ? "home-admin" : "home",
        params: [user.name, phoneNumber, user.id],
      };
      navigation.reset({
        index: 0,
        routes: [route],
      });
    }
  };

  const handelSignUp = () => {
    navigation.navigate("sign-up");
  };

  const updatetPass = (value) => {
    setpassword(base64.encode(value));
  };

  return (
    <View style={styles.container}>
      <Loading spinnerDefault={spinner} />
      <ScrollView style={styles.scroll}>
        <View style={styles.logoContainer}>
          <Logo/>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Số điện thoại"
            keyboardType="numeric"
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
    alignItems: "center"
  },
  toggleIcon: {
    position: "absolute",
    right: 10,
    top: 12
  },
  toggleImage: {
    width: 25,
    height: 25,
  },
});

export default Login;
