import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import HeaderAdmin from "../../../components/admin/headerAdmin";
import HomeAdmin from "../../../components/admin/homeAdmin";

const Admin = () => {
  const [componentName, setComponentName] = useState(<HomeAdmin />);

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderAdmin choosenComponent={setComponentName} />
      {/* container */}
      {componentName}
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(251,251,223,255)",
    paddingHorizontal: 20,
    paddingTop: 10,
    height: "100%",
  },
});
