export function AuthService() {
  var isLoggedIn = false;

  return {
    setIsLoggedIn: function (value) {
      isLoggedIn = value !== false;
    },
    getIsLoggedIn: function () {
      return isLoggedIn;
    }
  };
}
