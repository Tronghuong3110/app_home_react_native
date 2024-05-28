import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const SelectMonthOfYear = ( { setMonth }) => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(new Date());

  const monthYearItems = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const items = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(currentYear, month, 1);
      const monthYearLabel = date
        .toLocaleString("default", { month: "2-digit", year: "numeric" })
        .replace(/\//g, "-");
      const monthYearValue = date.toLocaleString("default", {
        month: "2-digit",
        year: "numeric",
      });
      const parts = monthYearValue.split(", ");
      const monthTmp = parts[0].replace("tháng ", "").padStart(2, "0");
      const yearTmp = parts[1];
      const formattedDate = `${monthTmp}/${yearTmp}`;
      items.push({
        label: monthYearLabel,
        value: formattedDate,
      });
    }

    return items;
  }, [selectedMonthYear]);

  const handleMonthYearChange = (value) => {
    setMonth(value);
  };

  return (
    <RNPickerSelect
      onValueChange={handleMonthYearChange}
      items={monthYearItems}
      placeholder={{
        label: "Chọn tháng/năm",
        value: null,
      }}
    />
  );
};

export default SelectMonthOfYear;
