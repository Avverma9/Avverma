export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  return JSON.stringify(localStorage.setItem(key, value));
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
