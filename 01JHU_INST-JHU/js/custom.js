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
    template: '<div><style>#form_field_genericCheckBox { display: none; } </style></div>',
    controller: ['$scope', 'primawsRest', function ($scope, primawsRest) {
      var patronStatusCode = "";

      this.$onInit = function () {
        primawsRest.myAccountPersonalSettings().then(function successCallback(response) {
          console.log(response.data);
          patronStatusCode = response.data.data.patronstatus[0].registration[0].institution[0].patronstatuscode;
      }, function errorCallback(response) {
          //Failure
          console.log(response);  
        });
  
        // Watch for changes in the dropdown value
        $scope.$watch(() => this.parentCtrl.formData["pickupLocation"], (newValue, oldValue) => {
          if (newValue !== oldValue) { // Check if the value has actually changed
            this.updateCheckboxVisibility(newValue);
          }
        });
      };

      function campusDeliveryEligible(patronStatusCode, selectedLocationId) {
        const homewoodId = "126006350007861$$LIBRARY";
        const welchId = "126007910007861$$LIBRARY";
        const eligibleHomewoodGroups = [ "jhfac", "jhgrad"];
        const eligibleWelchGroups = ["jhfac"];

        if (selectedLocationId === homewoodId) {
          return eligibleHomewoodGroups.includes(patronStatusCode);
        }

        if (selectedLocationId === welchId) {
          return eligibleWelchGroups.includes(patronStatusCode);
        }
      }

      this.updateCheckboxVisibility = function (selectedLocationId) {
        const checkbox = document.getElementById('form_field_genericCheckBox');

        if (campusDeliveryEligible(patronStatusCode, selectedLocationId)) {
          checkbox.style.display = 'block';
        } else {
          checkbox.style.display = 'none';
        }
      };
    }]
  });

  app.component('prmLocationHoldingsAfter', {
    bindings: { parentCtrl: '<' },
    templateUrl: '/discovery/custom/01JHU_INST-JHU/html/prm-location-holdings-after.html',
    controller: ['$scope', function ($scope) {
      var ctrl = this;
      
      this.$onInit = function () {
        $scope.$watch(
          function () {
            return ctrl.parentCtrl && ctrl.parentCtrl.currLoc && ctrl.parentCtrl.currLoc.summaryHoldings;
          },
          function (newVal, oldVal) {
            if (newVal) {
              ctrl.holdings = ctrl.parentCtrl.currLoc.summaryHoldings.allLines;
            }
          },
          true // deep watch to detect changes in nested objects
        );
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

  /* This service is used to get the patron/user's info -- currently used for office delivery */
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
