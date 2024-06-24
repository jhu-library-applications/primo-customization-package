export const prmLocationAfter = {
  bindings: { parentCtrl: '<' },
  templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-location-after.html",
  controller: ['AuthService', 'CapitalizeService', function (AuthService, CapitalizeService) {
    this.capitalize = CapitalizeService.capitalize;
    this.isLoggedIn = AuthService.getIsLoggedIn();

    this.$onInit = function () {
      console.log('prmLocationAfter');
    }
  }]
};
