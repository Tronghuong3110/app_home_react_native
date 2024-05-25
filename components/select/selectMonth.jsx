import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';

const SelectMonthOfYear = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = (event, newDate) => {
    switch(event) {
      case ACTION_DATE_SET:
        onSuccess(newDate);
        break;
      case ACTION_NEUTRAL:
        onNeutral(newDate);
        break;
      case ACTION_DISMISSED:
      default:
        onCancel(); //when ACTION_DISMISSED new date will be undefined
    }
  }

  return (
    <SafeAreaView>
      <Text>Month Year Picker Example</Text>
      {/* <Text>{moment(date, "MM-YYYY")}</Text> */}
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        />
      )}
    </SafeAreaView>
  );
};

export default SelectMonthOfYear;