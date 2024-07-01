export const prmAuthenticationAfter = {
  bindings: { parentCtrl: '<' },
  template: '<div></div>',
  controller: ['AuthService', function (AuthService) {
    this.$onInit = function () {
      AuthService.setIsLoggedIn(this.parentCtrl.isLoggedIn);
    }
  }]
};
