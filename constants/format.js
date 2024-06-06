export const formatMoney = (money) => {
  const formattedVND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
  return formattedVND;
};
