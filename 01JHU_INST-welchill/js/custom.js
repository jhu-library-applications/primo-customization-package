(function () {
  "use strict";

  console.log("Initializing 'viewCustom' module...");

  var app = angular.module('viewCustom', ['angularLoad', 'expand-items']);

  console.log("'viewCustom' module initialized.");

  app.component('prmTopBarBefore', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
  });

  console.log("Registered 'prmTopBarBefore' component.");

  app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bar-after.html"
  });

  console.log("Registered 'prmSearchBarAfter' component.");

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-result-thumbnail-container-after.html"
  });

  console.log("Registered 'prmSearchResultThumbnailContainerAfter' component.");

  angular
    .module('expand-items', [])
    .component('prmLocationItemAfter', {
      bindings: { parentCtrl: '<' },
      controller: function () {
        var ctrl = this;
        this.$onInit = function () {
          console.log("Inside $onInit for 'prmLocationItemAfter' component.");

          function showDetails() {
            console.log("Executing showDetails...");
            
            if (!ctrl.parentCtrl.loc || !ctrl.parentCtrl.currLoc.items) {
              console.log("Required properties are not available. Exiting showDetails.");
              return;
            }

            ctrl.parentCtrl.loc.isExpandAll = true;
            ctrl.parentCtrl.currLoc.items.forEach((item) => {
              item.isExpanded = true;
            });
            
            console.log("showDetails executed successfully.");
          }

          function requestLinks() {
            console.log("Executing requestLinks...");

            if (!ctrl.parentCtrl.currLoc.items) {
              console.log("Required properties are not available. Exiting requestLinks.");
              return;
            }

            var items = ctrl.parentCtrl.currLoc.items;
            items.forEach((item) => {
              console.log(`Additional item data: ${item._additionalData}`);
              if (item._additionalData.itemstatusname === 'Item in Place' &&
                  item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') < 0) {
                console.log("non-welch");
                item.listOfServices.forEach((service) => { service.allowed = "N"; });
              }
            });

            items.forEach((item) => {
              if (item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') >= 0) {
                console.log("welch");
                item.listOfServices.forEach((service) => { service.allowed = "Y"; });
              }
            });

            console.log("requestLinks executed successfully.");
          }

          showDetails();
          requestLinks();
          console.log("Exiting $onInit for 'prmLocationItemAfter' component.");
        }
      }
    });

  console.log("Registered 'prmLocationItemAfter' component in 'expand-items' module.");
})();
