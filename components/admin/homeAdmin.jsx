import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectItem from "../select/selectItem";
import chooses from "../../constants/listSelect";
import StatisticWeightByMonth from "./statistic/weight/statisticByMonth";

const HomeAdmin = () => {
  const [price, setPrice] = useState("0")
  const [typeProduct, setTypeProduct] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("dd/MM/yyyy");
  const [componentName, setComponentName] = useState(<StatisticWeightByMonth/>)

  const handleSetValue = (value) => {
      setTypeProduct(value.label);
      setPrice(value.price==null ? 0 : value.price);
      setComponentName(value.component);
      console.log(value)
  }

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
  const handleShowList = () => {
    alert("Show list weight in month");
  };

  return (
    <View style={styles.subContainer}>
      <SelectItem setTypeProduct={handleSetValue} title={"Chọn loại thống kê"} items = {chooses.chooses} defaultSelect = {{label: "Thống kê khối lượng theo tháng", value: <StatisticWeightByMonth/>}}/>
      
      {/* render component theo name */}
      {componentName}
    </View>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({
  subContainer: {
    // flex: 0.5,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    color: "#ffffff",
    fontWeight: "500",
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  select: {
    position: "relative"
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