import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getCurrentMonth, getListMonthYear } from "@/constants/date";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "@/components/loading/loading";
import SelectItem from "@/components/select/selectItem";
import TableCustom from "@/components/table/table";
import {
  getAllUser,
  getAllWeightByMonthAndGroupByProductType,
} from "@/lib/appwrite";

const StatisticWeightByUser = () => {
  const [month, setMonth] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [monthYears, setMonthYears] = useState([
    {
      label: "Chọn tháng",
      value: getCurrentMonth(),
    },
  ]);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([
    {
      label: "Chọn người",
      value: null,
    },
  ]);
  const [userId, setUserId] = useState(null);

  const handleSetMonth = (value) => {
    setMonth(value.value);
  };

  const handleSelectUser = (value) => {
    setUserId(value.value);
  };

  // load ra danh sách các tháng
  useEffect(() => {
    const listYear = getListMonthYear();
    setMonthYears([...monthYears, ...listYear]);
  }, []);

  // load ra danh sách toàn bộ user trong database
  useEffect(() => {
    const getUser = async () => {
      console.log(spinner);
      const listUsers = await getAllUser();
      setUsers([...users, ...listUsers]);
      setSpinner(false);
    };
    setSpinner(true);
    getUser();
  }, []);

  // lấy danh sách toàn khối lượng hàng nhóm theo loại hàng
  useEffect(() => {
    setSpinner(true);
    const getAllWeightByUser = async () => {
      const weights = await getAllWeightByMonthAndGroupByProductType(
        month,
        userId,
        2
      );
      setData(weights);
      setSpinner(false);
    };
    getAllWeightByUser();
  }, []);

  return (
    <SafeAreaView>
      <Loading spinnerDefault={spinner} />
      <SelectItem
        setTypeProduct={handleSetMonth}
        title={"Chọn tháng"}
        items={monthYears}
      />

      <SelectItem
        setTypeProduct={handleSelectUser}
        title={"Chọn người"}
        items={users}
      />

      <TableCustom
        month={month}
        data={data}
        statisticType={2}
        title={"Thống kê khối lượng hàng theo người theo tháng "}
      />
    </SafeAreaView>
  );
};

export default StatisticWeightByUser;

const styles = StyleSheet.create({});
