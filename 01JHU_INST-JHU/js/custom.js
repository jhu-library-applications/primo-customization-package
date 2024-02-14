(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  const capitalize = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
    controller: function ($scope) {
      $scope.capitalize = capitalize;

      this.$onInit = function () {
        console.log("prmLocationsAfter")
      };
    }
  });


  /* This is an override of the prmLocationItems component. prmLocationItems displays the items at a location. */
  app.component('prmLocationItemsAfter', {
    bindings: { parentCtrl: '<' },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-location-items-after.html",
    controller: function ($scope) {
      $scope.capitalize = capitalize

      this.$onInit = function () {
        console.log("prmLocationItemsAfter")
      };
    }
  });

})();
