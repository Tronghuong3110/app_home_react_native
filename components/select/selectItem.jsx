import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const SelectItem = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn loại loại hàng:</Text>
      <View style={styles.selectWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.select}
        >
          {/* <Picker.Item label="Hàng 46 ngắn" value="46n" /> */}
          <Picker.Item key={1} value="Hàng 46 ngắn" label="Hàng 46 ngắn" />
          <Picker.Item value="Hàng 46 dài" label="Hàng 46 dài" />
          <Picker.Item value="Hàng chân phích" label="Hàng chân phích" />
          <Picker.Item value="Hàng cực ổ 52" label="Hàng cực ổ 52" />
          <Picker.Item value="Hàng phích âm" label="Hàng phích âm" />
          <Picker.Item value="Hàng cực ổ 48" label="Hàng cực ổ 48" />
        </Picker>
      </View>
      {/* <Text style={styles.selectionText}>Selected value: {selectedValue}</Text> */}
      {/* <TextInput 
        style={styles.selectionText}
        value= {selectedValue}
        keyboardType="ascii-capable"
        editable={false} 
        // selectTextOnFocus={false}
        placeholder="Loại hàng"
        /> */}
    </View>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: "bold"
  },
  select: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
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
    justifyContent: "center",
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
});
