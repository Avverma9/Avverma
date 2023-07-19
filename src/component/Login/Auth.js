export const isLoggedIn = () => {
    return localStorage.getItem("isSignIn") === "true";
  };