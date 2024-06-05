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

const ListWeight = () => {
  // variable
  const [spinner, setSpinner] = useState(false);
  const params = useRoute().params;
  const items = params[1];
  const name = params[2];
  const userId = params[0];
  const navigation = useNavigation();
  const [monthYears, setMonthYears] = useState([
    {
      label: "Chọn tháng",
      value: null,
    },
  ]);
  const [month, setMonth] = useState("");
  const [productType, setProductType] = useState(0);

  useEffect(() => {
    const listYear = getListMonthYear();
    setMonthYears([...monthYears, ...listYear]);
    // console.log(monthYears);
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "sign-in" }],
    });
  };

  const handleSetMonth = (value) => {
    console.log(value);
  };
  const handleSetProductTye = (value) => {
    console.log(value);
  };
  const handleShowList = () => {
    alert("Xem bảng danh sách đã làm được !! ");
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
          {/* Chọn tháng */}
          <SelectItem
            setTypeProduct={handleSetMonth}
            title={"Chọn tháng"}
            items={monthYears}
          />
        </View>
        {/* Chọn loại hàng */}
        <View style={styles.subContainer}>
          {/* Chọn loại hàng */}
          <SelectItem
            setTypeProduct={handleSetProductTye}
            title={"Chọn loại hàng"}
            items={items}
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.btn} onPress={handleShowList}>
          <Text style={styles.text}>Xem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleBack}>
          <Text style={styles.text}>Quay lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ListWeight;

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
    // paddingTop: 20,
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
    color: "#ffffff",
    fontWeight: "500",
  },
});

const getListMonthYear = () => {
  const currentYear = new Date().getFullYear();
  const monthYearList = [];

  for (let i = 1990; i < currentYear + 20; i++) {
    // const year = currentYear + i;
    for (let j = 1; j <= 12; j++) {
      const month = String(j).padStart(2, "0");
      const monthYear = {
        label: `${month}/${i}`,
        value: `${month}/${i}`,
      };
      monthYearList.push(monthYear);
    }
  }
  return monthYearList;
};
