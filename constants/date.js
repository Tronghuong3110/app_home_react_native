export const getListMonthYear = () => {
  const currentYear = new Date().getFullYear();
  const monthYearList = [];

  for (let i = 2000; i < currentYear + 50; i++) {
    // const year = currentYear + i;
    for (let j = 1; j <= 12; j++) {
      const month = String(j).padStart(2, "0");
      const monthYear = {
        label: `${month}/${i}`,
        value: `${month}/${i}`,
      };
      monthYearList.push(monthYear);
    }
  }
  return monthYearList;
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  return `${
    currentMonth >= 10 ? currentMonth : "0" + currentMonth
  }/${currentYear}`;
};
