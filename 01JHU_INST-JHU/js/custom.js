(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  /* Components */
  app.component('prmTopBarBefore', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
  });

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-result-thumbnail-container-after.html"
  });

  /* This is the feedback button that appears in the top bar */
  app.component('prmSearchBookmarkFilterAfter', {
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bookmark-filter-after.html"
  });

  /* This is an override of the prmLocation component. prmLocations display in GetIt and show availability at a location. 
     You need to click on the location to see the items at that location and make a request. 
  */
  app.component('prmLocationAfter', {
    bindings: { parentCtrl: '<' },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-location-after.html",
    controller: ['AuthService', 'CapitalizeService', function (AuthService, CapitalizeService) {
      this.capitalize = CapitalizeService.capitalize;
      this.isLoggedIn = AuthService.getIsLoggedIn();

      this.$onInit = function () {
        console.log('prmLocationAfter');
      }
    }]
  });


  /* Used to get the user's authentication information -- not displayed */
  app.component('prmAuthenticationAfter', {
    bindings: { parentCtrl: '<' },
    template: '<div></div>',
    controller: ['AuthService', function (AuthService) {

      this.$onInit = function () {
        AuthService.setIsLoggedIn(this.parentCtrl.isLoggedIn);
      }
    }]
  });

  /* This is an override of the prmLocationItems component. prmLocationItems displays the items at a location. */
  /* This is component is more complex than prmLocation. */
  app.component('prmLocationItemsAfter', {
    bindings: { parentCtrl: '<' },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-location-items-after.html",
    controller: function () {
      this.$onInit = function () {
        console.log("prmLocationItemsAfter")
      };
    }
  });


  app.component('prmRequestAfter', {
    bindings: { parentCtrl: '<' },
    template: '<div></div>',
    controller: ['$scope', function ($scope) {

      this.$onInit = function () {

        // Watch for changes in the dropdown value
        $scope.$watch(() => this.parentCtrl.formData["pickupLocation"], (newValue, oldValue) => {
          if (newValue !== oldValue) { // Check if the value has actually changed
            this.updateCheckboxVisibility(newValue);
          }
        });
      };

      this.updateCheckboxVisibility = function (selectedLocationId) {
        const homewoodId = "126006350007861$$LIBRARY";
        const welchId = "126007910007861$$LIBRARY";

        const checkbox = document.getElementById('form_field_genericCheckBox');

        if (checkbox != null && (selectedLocationId === homewoodId || selectedLocationId === welchId)) {
          checkbox.style.display = 'block';
          console.log(selectedLocationId === homewoodId ? "Homewood selected" : "Welch selected");
        } else {
          checkbox.style.display = 'none';
        }
      };
    }]
  });

  /*Services */

  /* Simple service used to capitalize the first letter of a string */
  app.service('CapitalizeService', function () {
    this.capitalize = function (string) {
      if (!string) return string;
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  });

  /* This service is used to get the patron/user's info -- may not be needed, but could be handy */
  app.service("primawsRest", ['$http', function ($http) {
    this.myAccountPersonalSettings = function () {
      return $http({
        method: 'GET',
        url: '/primaws/rest/priv/myaccount/personal_settings',
        headers: {
          'Authorization': 'Bearer "' + sessionStorage.primoExploreJwt + '"',
        }
      });
    }
  }]);



  /* This service is used to keep track of whether the user is logged in or not. */
  app.service('AuthService', function () {
    var isLoggedIn = false;

    return {
      setIsLoggedIn: function (value) {
        if (value === false) {
          isLoggedIn = false;
        } else {
          isLoggedIn = true;
        }
      },
      getIsLoggedIn: function () {
        return isLoggedIn;
      }
    };
  });
})();
