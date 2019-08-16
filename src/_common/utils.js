export const getMe = () => {
  return JSON.parse(sessionStorage.getItem("me"));
};

export const isNumber = input => {
  const regex = /[0-9]/g;
  return input === '' || regex.test(input);
};