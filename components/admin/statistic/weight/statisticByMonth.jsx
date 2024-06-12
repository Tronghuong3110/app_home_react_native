import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import TableCustom from "../../../table/table";
import { SafeAreaView } from "react-native-safe-area-context";
import { getListMonthYear, getCurrentMonth } from "@/constants/date";
import SelectItem from "@/components/select/selectItem";
import { getAllWeightByMonthAndGroupByProductType } from "@/lib/appwrite";
import Loading from "@/components/loading/loading";

const StatisticWeightByMonth = () => {
  const [month, setMonth] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [monthYears, setMonthYears] = useState([
    {
      label: "Chọn tháng",
      value: getCurrentMonth(),
    },
  ]);
  const [data, setData] = useState([]);
  const handleSetMonth = (value) => {
    setMonth(value.value);
  };
  useEffect(() => {
    const listYear = getListMonthYear();
    setMonthYears([...monthYears, ...listYear]);
  }, []);

  useEffect(() => {
    setSpinner(true);
    const getAllWeight = async () => {
      const weights = await getAllWeightByMonthAndGroupByProductType(
        month, null, 1
      );
      setData(weights);
      setSpinner(false);
    };
    getAllWeight();
  }, [month]);

  return (
    <SafeAreaView>
      <Loading spinnerDefault={spinner} />
      <SelectItem
        setTypeProduct={handleSetMonth}
        title={"Chọn tháng"}
        items={monthYears}
      />
      <TableCustom
        month={month}
        data={data}
        statisticType={1}
        title={"Thống kê khối lượng hàng trong tháng "}
      />
    </SafeAreaView>
  );
};

export default StatisticWeightByMonth;

const styles = StyleSheet.create({
  lable: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
