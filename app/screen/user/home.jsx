import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../../../components/header/header";
import React, { useState, useEffect, useCallback } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectItem from "../../../components/select/selectItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getAllProductType,
  createWeightOfUser,
  getTotalPriceAndWeight,
} from "@/lib/appwrite";
import { getCurrentMonth } from "@/constants/date";
import { formatMoney } from "@/constants/format";
import Loading from "@/components/loading/loading";

const Home = () => {
  // variable
  const params = useRoute().params;
  const name = params[0];
  const userId = params[2];
  const [date, setDate] = useState("dd/MM/yyyy");
  const [weight, setWeight] = useState(0);
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [price, setPrice] = useState(0);
  const [typeProduct, setTypeProduct] = useState();
  const [nameProductType, setNameProductType] = useState("")
  const [spinner, setSpinner] = useState(false);

  const [totalPrice, settotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [isUpdateTotal, setIsUpdateTotal] = useState(false);

  const [items, setItems] = useState([
    {
      value: null,
      label: "Chọn loại hàng",
      price: formatMoney(0),
    },
  ]);

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

  // lưu thông tin hàng vào database
  const handleSave = async () => {
    // Lấy ngày, lấy loại hàng, lấy khối lượng, lấy số điện thoại
    if (
      date == "dd/MM/yyyy" ||
      weight == "" ||
      typeProduct == null ||
      price == 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin !!");
      return;
    } else {
      setSpinner(true);
      const handleSaveWeight = await createWeightOfUser(
        date,
        userId,
        weight,
        typeProduct,
        price,
        nameProductType
      );
      setSpinner(false);
      if (handleSaveWeight == true) {
        // TH ngày lưu vẫn nằm trong tháng hiện tại
        if (date.includes(getCurrentMonth())) {
          const cleanedString = totalPrice.toString().replace(/₫/g, '');
          const floatValue = parseFloat(cleanedString * 1000) + parseFloat(weight * price);
          console.log(cleanedString);
          console.log(floatValue);
          setTotalWeight(totalWeight + weight);
          settotalPrice(formatMoney(floatValue));
        } else {
          setIsUpdateTotal(!isUpdateTotal);
        }
        alert("Thành công !!");
        setDate("dd/MM/yyyy");
        setWeight("");
      } else {
        alert("Lưu thất bại !!");
      }
    }
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "sign-in" }],
    });
  };

  const handleShowList = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "show-list",
          params: [userId, items, name],
        },
      ],
    });
  };

  const handleSetPrice = (value) => {
    setTypeProduct(value.value != null ? value.value : "");
    setNameProductType(value.label)
    setPrice(value.price == null ? formatMoney(0) : formatMoney(value.price));
  };

  const handleSetWeight = (weight) => {
    weight = weight.includes(",") ? weight.replace(",", ".") : weight;
    setWeight(parseFloat(weight));
  }

  // lấy danh sách các loại hàng
  useEffect(() => {
    const fetchData = async () => {
      const productTypes = await getAllProductType();
      setItems([
        {
          label: "Chọn loại hàng",
          value: null,
          price: 0,
        },
        ...productTypes,
      ]);
    };
    fetchData();
  }, []);

  // lấy tổng tiền đã làm được trong tháng
  useEffect(() => {
    setSpinner(true);
    const getTotalPrice = async () => {
      const data = await getTotalPriceAndWeight(getCurrentMonth(), userId);
      settotalPrice(data.totalPrice);
      setTotalWeight(data.totalWeight);
      setSpinner(false);
    };
    getTotalPrice();
  }, [isUpdateTotal]);

  return (
    <View style={styles.container}>
      <Loading spinnerDefault={spinner} />
      <ScrollView style={styles.scroll}>
        <View style={styles.headerMenuContainer}>
          <View style={styles.logo}>
            <Header />
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
          {/* <View style = {styles.select}> */}
          <SelectItem
            setTypeProduct={handleSetPrice}
            title={"Chọn loại hàng"}
            items={items}
          />
          {/* </View> */}

          <Text style={styles.label}>Đơn giá (VND): {price}</Text>

          <Text style={styles.label}>Khối lượng (kg):</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={handleSetWeight}
            keyboardType="numeric"
            placeholder="Khối lượng(Kg)"
          />
          <TouchableOpacity style={styles.btn} onPress={handleSave}>
            <Text style={styles.text}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleShowList}>
            <Text style={styles.text}>Xem danh chi tiết</Text>
          </TouchableOpacity>
          <Text style={styles.label}>
            Tổng tiền khối lượng trong tháng: {totalWeight} kg
          </Text>
          <Text style={styles.label}>
            Tổng tiền trong tháng: {totalPrice} VND
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
    opacity: 0.7,
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
    fontSize: 18
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

