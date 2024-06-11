import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

import images from "../../constants/images"

const PasswordInput = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        secureTextEntry={!passwordVisible}
        placeholder="Password"
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleIcon}>
        <Image
          source={passwordVisible ? images.hiden_pass : images.view_pass}
          style={styles.toggleImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingRight: 30,
  },
  toggleIcon: {
    position: 'absolute',
    right: 10,
  },
  toggleImage: {
    width: 20,
    height: 20,
  },
});

export default PasswordInput;