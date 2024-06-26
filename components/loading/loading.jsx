import React, { Component, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const Loading = (props) => {
  const { spinnerDefault } = props;
//   console.log(spinnerDefault);
//   const [spinner, setSpinner] = useState(spinnerDefault);
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinnerDefault}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      {/* <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
