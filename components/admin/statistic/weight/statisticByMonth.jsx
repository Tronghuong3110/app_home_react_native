import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TableCustom from "../../../table/table";
import SelectMonthOfYear from "../../../select/selectMonth";

const StatisticWeightByMonth = () => {
  return (
    <View>
      <SelectMonthOfYear/>

      <TableCustom />
    </View>
  );
};

export default StatisticWeightByMonth;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 16,
    // paddingTop: 30,
    // backgroundColor: "#fff"
  },
});
