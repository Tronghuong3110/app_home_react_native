import StatisticWeightByMonth from "../components/admin/statistic/weight/statisticByMonth"
import StatisticWeightByUser from "../components/admin/statistic/weight/statisticByUser"
import StatisticSalaryByUser from "../components/admin/statistic/salary/statisticByUser"
import { getAllProductType } from "@/lib/appwrite"

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
    value: 4,
    label: "Thống kê tiền lương theo người",
    component: <StatisticSalaryByUser />,
  }
]; 

const items = getAllProductType();  

export default { chooses, items }; 