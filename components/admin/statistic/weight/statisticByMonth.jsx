import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TableCustom from "../../../table/table";
import SelectMonthOfYear from "../../../select/selectMonth";
import { SafeAreaView } from "react-native-safe-area-context";

const StatisticWeightByMonth = () => {
  const [month, setMonth] = useState("");

  return (
    <SafeAreaView style={ styles.select}>
      <Text style={styles.lable}>Chọn tháng:</Text>
      <SelectMonthOfYear setMonth={setMonth} />

      <TableCustom month={month} />
    </SafeAreaView>
  );
};

export default StatisticWeightByMonth;

const styles = StyleSheet.create({
  select: {
    // marginTop: -30

  },
  lable: {
    fontSize: 16,
    fontWeight: "bold",
    // marginVertical: 10,
  },
});
