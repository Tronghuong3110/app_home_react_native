import StatisticWeightByMonth from "../components/admin/statistic/weight/statisticByMonth"
import StatisticWeightByUser from "../components/admin/statistic/weight/statisticByUser"
import StatisticSalaryByMonth from "../components/admin/statistic/salary/statisticByMonth"
import StatisticSalaryByUser from "../components/admin/statistic/salary/statisticByUser"

const chooses = [
  {
    value: 1,
    label: "Thống kê khối lượng theo tháng",
    component: <StatisticWeightByMonth />,
  },
  {
    value: 2,
    label: "Thống kê khối lượng theo người",
    component: <StatisticWeightByUser />,
  },
  {
    value: 3,
    label: "Thống kê tiền lương theo tháng",
    component: <StatisticSalaryByMonth />,
  },
  {
    value: 4,
    label: "Thống kê tiền lương theo người",
    component: <StatisticSalaryByUser />,
  }
];

const items = [
  { value: "ID", label: "Hàng 46 ngắn", price: 16.0 },
  { value: "Hàng 46 dài", label: "Hàng 46 dài", price: 16.0 },
  { value: "Hàng chân phích", label: "Hàng chân phích", price: 16.0 },
  { value: "Hàng cực ổ 52", label: "Hàng cực ổ 52", price: 16.0 },
  { value: "Hàng phích âm", label: "Hàng phích âm", price: 16.0 },
  { value: "Hàng cực ổ 48", label: "Hàng cực ổ 48", price: 16.0 },
];


export default { chooses, items };