import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderAdmin from "../../app/screen/admin/headerAdmin";

const Statistic = () => {
  return (
    <View style={styles.subContainer}>
      <Text>Trang thống kê</Text>
    </View>
  );
};

export default Statistic;

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
  subContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    borderRadius: 10,
  },
});
