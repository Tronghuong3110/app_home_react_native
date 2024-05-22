import React from 'react';
import images from "../../constants/images"
import { View, Image, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={images.logo} // Đường dẫn đến file logo của bạn
        style={styles.logo}
      />
      {/* <Text>Logo</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    // position: "absolute",
    // top: -70,
    width: 100,
    height: 100,
    marginTop: 0
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;