import React, { Component, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

const TableCustom = ( { month }) => {
  const [tableHead, setTableHead] = useState(["Ngày", "Tên hàng", "Khối lượng"]);
  const [data, setData] = useState([
    ["05/06/2024", "Hàng 46 dài", "2"],
    ["05/06/2024", "Chân phích", "2"],
    ["05/06/2024", "Hàng phích âm", "2"],
    ["05/06/2024", "1", "2"],
  ]);
  const sizeCol = [1, 2, 1];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={tableHead}
          flexArr={sizeCol}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={data}
            flexArr={sizeCol}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

export default TableCustom;

const styles = StyleSheet.create({
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  wrapper: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  row: {
    height: 28,
  },
  text: {
    textAlign: "center",
  },
    // container: {
    //   flex: 1,
    //   padding: 16,
    //   paddingTop: 30,
    //   backgroundColor: "#fff"
    // },
});
