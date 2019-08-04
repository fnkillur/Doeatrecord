export const getMe = () => {
  return JSON.parse(sessionStorage.getItem("me"));
};