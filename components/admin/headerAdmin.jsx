import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Menu from "@/components/menu/menu";
import Header from "@/components/header/header";
import { useNavigation, useRoute } from "@react-navigation/native";

const HeaderAdmin = ( {choosenComponent}) => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "sign-in" }],
    });
  };

  const test = (nameComponent) => {
    // console.log(nameComponent);
    choosenComponent(nameComponent);
  }

  return (
    <View style={styles.hearderContainer}>
      <View style={styles.menu}>
        <Menu choosenComponent={test}/>
      </View>

      <View style={styles.logo}>
        <Header />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderAdmin;

const styles = StyleSheet.create({
  hearderContainer: {
    // display: "flex",
    // backgroundColor: "rgba(251,251,223,255)",
    // paddingHorizontal: 20,
    // paddingTop: 10,
    // height: 80,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
    backgroundColor: "rgba(251,251,223,255)",
    height: 100,
    zIndex: 1,
  },
  menu: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    // justifyContent: "center",
    // alignItems: "center"
    // textAlign: "center"
  },
  logo: {
    position: "absolute",
    left: "35%",
  },
  btn: {
    position: "absolute",
    right: 0,
    top: "35%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#ccc",
    opacity: 0.7,
  },
});
