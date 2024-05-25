import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const SelectItem = ({ setTypeProduct, title, items, defaultSelect }) => {
  const [item, setItem] = useState(defaultSelect);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}:</Text>
      {/* Select  */}
      <RNPickerSelect
        style={styles.select}
        onValueChange={(value, index) => {
          setTypeProduct(items[index]);
        }}
        items={items}
        placeholder={{}}
      />
    </View>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flex: 1,
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
