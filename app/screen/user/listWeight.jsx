import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Loading from "@/components/loading/loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectItem from "../../../components/select/selectItem";
import Header from "../../../components/header/header";
import { getListWeightOfUserAndMonth } from "@/lib/appwrite";
import TableStatistic from "@/components/table/dataTable";
import TableCustom from "@/components/table/table";
import { getListMonthYear, getCurrentMonth } from "@/constants/date";

const ListWeight = () => {
  // variable
  const [spinner, setSpinner] = useState(false);
  const params = useRoute().params;
  const items = params[1];
  const name = params[2];
  const userId = params[0];
  const [isShowTabble, setIsShhowTable] = useState(false);
  const navigation = useNavigation();
  const [monthYears, setMonthYears] = useState([
    {
      label: "Chọn tháng",
      value: null,
    },
  ]);
  const [month, setMonth] = useState(null);
  const [productType, setProductType] = useState(null);
  const [listWeight, setListWeight] = useState([]);

  useEffect(() => {
    const listYear = getListMonthYear();
    setMonthYears([...monthYears, ...listYear]);
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "sign-in" }],
    });
  };

  const handleSetMonth = (value) => {
    setMonth(value.value);
  };
  const handleSetProductTye = (value) => {
    setProductType(value.value);
  };
  const handleShowList = () => {
    // setListWeight([]);
    getListWeight();
    setIsShhowTable(true);
  };
  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "home",
          params: [name, name, userId],
        },
      ],
    });
  };
  // get list weight of user from database
  const getListWeight = async () => {
    setSpinner(true);
    const data = await getListWeightOfUserAndMonth(month, userId, productType);
    setListWeight(data);
    setSpinner(false);
    if (month == null) {
      setMonth(getCurrentMonth());
    }
  };

  return (
    <View style={styles.container}>
      <Loading spinnerDefault={spinner} />
      <ScrollView style={styles.scroll}>
        <View style={styles.headerMenuContainer}>
          <View style={styles.logo}>
            <Header />
          </View>

          {/* <View> */}
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text>Đăng xuất</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
        {/* Chọn tháng */}
        <View style={styles.subContainer}>
          <Text style={styles.text}>
            Xem danh thông tin chi tiết theo tháng {month}
          </Text>
          {/* Chọn tháng */}
          <SelectItem
            setTypeProduct={handleSetMonth}
            title={"Chọn tháng"}
            items={monthYears}
          />
          {/* Chọn loại hàng */}
          <SelectItem
            setTypeProduct={handleSetProductTye}
            title={"Chọn loại hàng"}
            items={items}
          />
          {isShowTabble && <TableCustom month={""} data={listWeight.data} statisticType={4} title={""}/>}
          <Text style={styles.label}>Tổng cân nặng: {listWeight.totalWeight} kg</Text>
        </View>

        {/* {isShowTabble && <TableStatistic data={listWeight} />} */}

        {/* Button */}
        <TouchableOpacity style={styles.btn} onPress={handleShowList}>
          <Text style={styles.textBtn}>Xem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleBack}>
          <Text style={styles.textBtn}>Quay lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ListWeight;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(251,251,223,255)",
    // paddingHorizontal: 20,
    paddingTop: 10,
    // height: "100%"
  },
  scroll: {
    // flex: 1,
    height: "100%",
  },
  headerMenuContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(251,251,223,255)",
    zIndex: 1,
  },
  logo: {
    position: "relative",
  },
  subContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    borderRadius: 10,
  },
  logout: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#ccc",
    opacity: 0.7,
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
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 22,
  },
  textBtn: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 18
  },
  label: {
    paddingTop: 10,
    fontWeight: "500",
    fontSize: 20
  }
});
