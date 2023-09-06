(function () {
  "use strict"

  var app = angular.module('viewCustom', ['angularLoad'])

  app.component('prmTopBarBefore', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
  })

  app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bar-after.html"
  })

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-result-thumbnail-container-after.html"
  })


  angular
    .module('expand-items', [])
    .component('prmLocationItemAfter', {
      bindings: { parentCtrl: '<' },
      controller: function ($timeout) {
        var ctrl = this
        this.$onInit = function () {
          {
            $timeout(showDetails, 2000)
            function showDetails() {
              ctrl.parentCtrl.loc.isExpandAll = true
              ctrl.parentCtrl.currLoc.items.forEach((item) => {
                item.isExpanded = true
              })
            }
          }
        }
      }
    })


  angular
    .module('request-links', [])
    .component('prmLocationItemAfter', {
      bindings: { parentCtrl: '<' },
      controller: function ($timeout) {
        var ctrl = this
        this.$onInit = function () {
          {
            $timeout(requestLinks, 2000)
            function requestLinks() {
              var items = ctrl.parentCtrl.currLoc.items
              items.forEach((item) => {
                console.log(`Additional item data: ${item._additionalData}`)
                if (item._additionalData.itemstatusname === 'Item in Place' &&
                  item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') < 0
                ) {
                  console.log("non-welch")
                  item.listOfServices.forEach((service) => { service.allowed = "N" })
                }
              })

              items.forEach((item) => {
                if (item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') >= 0) {
                  console.log("welch")
                  item.listOfServices.forEach((service) => { service.allowed = "Y" })
                }
              })
            }
          }
        }
      }
    })
})
