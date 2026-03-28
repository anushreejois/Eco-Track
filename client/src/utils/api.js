export const BASE_URL = process.env.REACT_APP_API_URL;

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};