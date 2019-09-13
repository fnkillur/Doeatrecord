export const getMe = () => JSON.parse(sessionStorage.getItem("me"));

export const isNumber = input => {
  const regex = /[0-9]/g;
  return input === '' || regex.test(input);
};

export const convertMoney = (money = 0) => money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");