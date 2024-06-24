export function primawsRest($http) {
  this.myAccountPersonalSettings = function () {
    return $http({
      method: 'GET',
      url: '/primaws/rest/priv/myaccount/personal_settings',
      headers: {
        'Authorization': 'Bearer "' + sessionStorage.primoExploreJwt + '"',
      }
    });
  }
}
primawsRest.$inject = ['$http'];
