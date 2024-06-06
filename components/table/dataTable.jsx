import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";

const TableStatistic = ({ data }) => {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Ngày</DataTable.Title>
        <DataTable.Title>Tên hàng</DataTable.Title>
        <DataTable.Title style={styles.headerTitleRight}>Cân nặng (Kg)</DataTable.Title>
      </DataTable.Header>

      {data.map((item, index) => (
        <DataTable.Row key={index} style={styles.row}>
          <DataTable.Cell>{item.date}</DataTable.Cell>
          <DataTable.Cell style={styles.cellCenter}>{item.nameProduct}</DataTable.Cell>
          <DataTable.Cell style={styles.cellRight}>{item.weight}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default TableStatistic;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  tableHeader: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleRight: {
    flex: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  cellCenter: {
    flex: 2,
  },
  cellRight: {
    flex: 0.4,
  },
});
