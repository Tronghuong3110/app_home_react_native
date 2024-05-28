import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MonthPicker = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleClose = () => {
    // Xử lý khi người dùng nhấn nút Đóng, ví dụ: đóng cửa sổ
    console.log('Đã đóng cửa sổ');
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
        <TouchableOpacity
          key={month}
          style={[
            styles.monthButton,
            selectedMonth === month && styles.selectedMonthButton,
          ]}
          onPress={() => handleMonthSelect(month)}
        >
          <Text
            style={[
              styles.monthText,
              selectedMonth === month && styles.selectedMonthText,
            ]}
          >
            Tháng {month}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>Đóng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedMonthButton: {
    backgroundColor: '#007AFF',
  },
  monthText: {
    fontSize: 16,
  },
  selectedMonthText: {
    color: '#FFFFFF',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MonthPicker;