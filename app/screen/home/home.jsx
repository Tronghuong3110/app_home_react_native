import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Menu from "../../../components/menu/menu";
import Header from "../../../components/header/header";
import React, { useState, useEffect, useCallback } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectItem from "../../../components/select/selectItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const Home = () => {
  // variable 
  const params = useRoute().params;
  const name = params[0];
  const phoneNumber = params[1];
  const [date, setDate] = useState("dd/MM/yyyy");
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const pricePerKg = 10;
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showListWeight, setShowListWeight] = useState(false); // Sửa lại từ useEffect
  const [monthYear, setMonthYear] = useState("04/2024");
  const [price, setPrice] = useState("0")
  const [typeProduct, setTypeProduct] = useState();
 
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
    // alert("Save info");
    console.log(typeProduct);
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "sign-in" }],
    });
    // alert("Logout");
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
  const handleSetPrice = (value) => {
    if(value == null) {
      setPrice(0);
    }
    else {
      const tmp = value.split('-');
      setTypeProduct(tmp[0]);
      setPrice(tmp[1]==undefined ? 0 : tmp[1]);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.headerMenuContainer}>
          {/* <View style={styles.menu}>
            <Menu />
            <Text>Menu</Text>
          </View> */}
          <View style={styles.logo}>
            <Header />
            {/* <Text>Logo</Text> */}
          </View>

          {/* <View> */}
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text>Đăng xuất</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>

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
          <SelectItem setTypeProduct = {handleSetPrice} />
          <Text style={styles.label}>Đơn giá (VND): {price}</Text>

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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(251,251,223,255)",
    paddingHorizontal: 20,
    paddingTop: 10,
    // height: "100%"
  },
  scroll: {
    // flex: 1,
    height: "100%",
  },
  headerMenuContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(251,251,223,255)",
    zIndex: 1,
  },
  subContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    borderRadius: 10,
  },
  menu: {
    position: "absolute",
    left: 0,
  },
  logout: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#ccc",
    opacity: 0.7
  },
  logo: {
    position: "relative",
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
    borderRadius: 40,
  },
  text: {
    color: "#ffffff",
    fontWeight: "500",
  },
  select: {
    zIndex: 1
  }
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
