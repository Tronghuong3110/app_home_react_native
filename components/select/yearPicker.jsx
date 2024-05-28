import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const YearPicker = () => {
  const [selectedYear, setSelectedYear] = useState(null);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleClose = () => {
    // Xử lý khi người dùng nhấn nút Đóng, ví dụ: đóng cửa sổ
    console.log('Đã đóng cửa sổ');
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 10 }, (_, i) => getCurrentYear() - 5 + i).map((year) => (
        <TouchableOpacity
          key={year}
          style={[
            styles.yearButton,
            selectedYear === year && styles.selectedYearButton,
          ]}
          onPress={() => handleYearSelect(year)}
        >
          <Text
            style={[
              styles.yearText,
              selectedYear === year && styles.selectedYearText,
            ]}
          >
            {year}
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
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedYearButton: {
    backgroundColor: '#007AFF',
  },
  yearText: {
    fontSize: 16,
  },
  selectedYearText: {
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

export default YearPicker;