import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import images from "../../../constants/images";

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={images.logo2} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // circle: {
  //   display: "flex",
  //   width: 200,
  //   height: 200,
  //   borderRadius: 100,
  //   // backgroundColor: "#f2f2f2",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // text1: {
  //   position: "absolute",
  //   left: 3,
  // },
  // text2: {
  //   position: "absolute",
  //   left: 15,
  //   top: 40,
  // },
  // text3: {
  //   position: "absolute",
  //   left: 45,
  //   top: 10,
  // },
  // text4: {
  //   position: "absolute",
  //   left: 90,
  //   top: -3,
  // },
  // text5: {
  //   position: "absolute",
  //   right: 45,
  //   top: 10,
  // },
  // text6: {
  //   position: "absolute",
  //   right: 15,
  //   top: 40,
  // },
  // text7: {
  //   position: "absolute",
  //   right: -2,
  // },
  // textCOD: {
  //   color: "#000",
  //   fontSize: 22,
  //   fontWeight: "bold",
  // },
  // textWinMax: {
  //   marginTop: 100,
  //   color: "#000",
  //   fontSize: 28,
  //   fontWeight: "bold",
  // },
  logo: {
    position: "absolute",
    top: "20%",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 150,
  },
});

export default Logo;
