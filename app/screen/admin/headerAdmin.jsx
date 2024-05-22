import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Menu from "@/components/menu/menu";
import Header from "@/components/header/header"
import { useNavigation, useRoute } from "@react-navigation/native";

const HeaderAdmin = () => {
    const navigation = useNavigation();
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "sign-in" }],
    });
  };

  return (
    <View style={styles.headerMenuContainer}>
      <View style={styles.menu}>
        <Menu />
      </View>

      <View style={styles.logo}>
        <Header />
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderAdmin;

const styles = StyleSheet.create({
  hearderContainer: {
    display: "flex",
    backgroundColor: "rgba(251,251,223,255)",
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 80,
  },
  menu: {
    
  },
});
