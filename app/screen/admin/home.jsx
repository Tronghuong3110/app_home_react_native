import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Header from "../admin/headerAdmin"
import ManagerTypeProduct from "../../../components/admin/managerProduct";
import Statistic from "../../../components/admin/statistic";

const Admin = () => {
  const [componentName, setComponentName] = useState(<HomeAdmin/>);

  return (
    <View style={styles.container}>
      <View style={styles.scroll}>
        {/* Header */}
        <Header choosenComponent={setComponentName}/>

      {/* container */}
      { componentName }
      </View>
    </View>
  );
};

export default Admin;

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
});
