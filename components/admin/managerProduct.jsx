import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createProductType } from "@/lib/appwrite";
import Loading from "../loading/loading";

const ManagerProductType = () => {
  const [productype, setproductype] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    if (productype == "" || price == "") {
      alert("Vui lòng điền đầy đủ thông tin!!");
    } else {
      setIsLoading(true);
      const responseCreateProductType = createProductType(productype, price);
      setIsLoading(false);

      if(responseCreateProductType) {
        setPrice();
        setproductype("");
        alert("Thêm mới loại hàng thành công !!");
      }
      else {
        alert("Thêm mới thất bại!!")
      }
    }
  };

  return (
    <View>
      <Loading spinnerDefault = {isLoading}/>
      <ScrollView style={styles.subContainer}>
        <Text style={styles.label}>Tên mặt hàng:</Text>
        <TextInput
          style={styles.input}
          value={productype}
          onChangeText={setproductype}
          keyboardType="ascii-capable"
          placeholder="Tên mặt hàng"
        />

        <Text style={styles.label}>Đơn giá:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Đơn giá"
        />
        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.text}>Lưu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ManagerProductType;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(251,251,223,255)",
    paddingHorizontal: 20,
    paddingTop: 10,
    // height: "100%"
  },
  scroll: {
    // flex: 1,
    height: "100%",
  },
  subContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
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
});
