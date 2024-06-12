import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

const TableCustom = ({ month, data, statisticType, title }) => {
  const [tableHead, setTableHead] = useState([
    "Tên hàng",
    "Khối Lượng",
    "Tổng tiền",
  ]);
  const [sizeCol, setSizeCol] = useState([2, 1, 1]);

  useEffect(() => {
    switch (statisticType) {
      case 1:
        setTableHead(["Tên hàng", "Khối Lượng", "Tổng tiền"]); // ok
        setSizeCol([2, 1, 1]);
        break;
      case 2:
        setTableHead(["Tên người", "Tên hàng", "Khối lượng"]); // ok
        setSizeCol([2, 2, 1]);
        break;
      case 3:
        setTableHead(["Tên người", "Tên hàng", "Khối lượng", "Tổng tiền"]);
        setSizeCol([0.7, 1, 0.5, 1]);
        break;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.lable}>{title} {month}</Text>
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
  container: {
    paddingTop: 30,
  },
  lable: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 22,
    paddingBottom: 15
  },
});
