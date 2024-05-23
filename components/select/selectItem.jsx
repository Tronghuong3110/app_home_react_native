import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const SelectItem = ({ setTypeProduct }) => {

  const items = [
    { value: "ID-16.000", label: "Hàng 46 ngắn"},
    { value: "Hàng 46 dài", label: "Hàng 46 dài" },
    { value: "Hàng chân phích", label: "Hàng chân phích" },
    { value: "Hàng cực ổ 52", label: "Hàng cực ổ 52" },
    { value: "Hàng phích âm", label: "Hàng phích âm" },
    { value: "Hàng cực ổ 48", label: "Hàng cực ổ 48" },
  ];
  const valueDefault = {label: "Chọn loại hàng", value: null};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn loại loại hàng:</Text>
    {/* Select  */}
      <RNPickerSelect 
        style={styles.select}
        onValueChange={(value) => setTypeProduct(value)}
        items={items}
        placeholder = {valueDefault}
      />
    </View>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // padding: 16,
    // zIndex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: "bold",
  },
  select: {
    // height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    // zIndex: 1
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
    // padding: 10,
    // marginBottom: 10,
  },
  selectionText: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  selectWrapper: {
    flex: 1,
    // justifyContent: "center",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
});
