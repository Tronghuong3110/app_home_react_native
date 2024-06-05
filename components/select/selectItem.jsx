import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ScrollView } from "react-native-gesture-handler";

const SelectItem = ({ setTypeProduct, title, items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}:</Text>
      {/* Select  */}
      <ScrollView style = {styles.selectContainer}>
        <RNPickerSelect
          onValueChange={(value, index) => {
            setTypeProduct(items[index]);
          }}
          items={items}
          placeholder={{}}
        />
      </ScrollView>
    </View>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 13,
    marginTop: 10,
    fontWeight: "bold",
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
  selectContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10
  }
});
