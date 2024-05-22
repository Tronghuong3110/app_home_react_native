// import * as SplashScreen from 'expo-splash-screen';
// import 'react-native-reanimated';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import { StatusBar } from "expo-status-bar";
  import { Link } from "expo-router";
  import { SafeAreaView } from "react-native-safe-area-context";
  // import { ScrollView } from "react-native-gesture-handler";
  import images from "../../constants/images";
  import Menu from "../menu/menu";
  import Header from "../header/header";
  import React, { useState, useEffect, useCallback } from "react";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  // Prevent the splash screen from auto-hiding before asset loading is complete.
  // SplashScreen.preventAutoHideAsync();
  import SelectItem from "../select/selectItem";

const Home = () => {
  // Variables
  // variable
  const name = "Trọng Hướng";
  const [date, setDate] = useState("dd/MM/yyyy");
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const pricePerKg = 10;
  // const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showListWeight, setShowListWeight] = useState(false); // Sửa lại từ useEffect
  const [monthYear, setMonthYear] = useState("04/2024");

  // function
  const handleConfirmDate = (selectedDate) => {
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSave = () => {
    alert("Save info");
  };

  const handleLogout = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Login" }],
    // });
    alert("Logout");
  };

  const handleShowList = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: "ListWeight",
    //       params: {
    //         date: monthYear,
    //       },
    //     },
    //   ],
    // });
    alert("Show list weight in month");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerMenuContainer}>
        <View style={styles.menu}>
          <Menu />
        </View>
        <View style={styles.header}>
          <Header />
        </View>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.subContainer}>
          <Text style={styles.label}>Họ và tên: {name}</Text>
          {/* Chọn ngày làm việc */}
          <Text style={styles.label}>Chọn ngày:</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text>{date}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          {/* Chọn loại hàng */}
          <SelectItem />

          <Text style={styles.label}>Khối lượng (kg):</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Khối lượng(Kg)"
          />
          <TouchableOpacity style={styles.btn} onPress={handleSave}>
            <Text style={styles.text}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleShowList}>
            <Text style={styles.text}>Xem danh trong tháng</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Tổng khối lượng: {totalWeight} kg</Text>
          <Text style={styles.label}>
            Tổng tiền: {totalWeight * pricePerKg} VND
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  headerMenuContainer: {
    // position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfbe1",
    height: 80,
    zIndex: 1,
  },
  subContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  logout: {
    position: "absolute",
    right: 10,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    display: "flex",
    height: 40,
    backgroundColor: "#2196f3",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#ffffff",
    fontWeight: "500",
  },
});

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day >= 10 ? day : "0" + day}/${
    month >= 10 ? month : "0" + month
  }/${year}`;
  return formattedDate;
};
