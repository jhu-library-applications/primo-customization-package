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

  app.component('prm-opac-after', {
    bindings: { parentCtrl: `<` },
    controller: 'prmOpacAfterController'
  })


  app.controller('prmLocationItemAfter', ['$scope', function ($scope) {
    var vm = this
    var items = vm.$scope().$parent.$ctrl.currLoc.items

    console.log(`Items: ${items}`)
    // Disable BorrowDirect and Illiad links for items that are available 
    items.forEach((item) => {
      console.log(`Additional item data: ${item._additionalData}`)
      if (item._additionalData.itemstatusname === 'Item in Place' &&
        item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') < 0
      ) {
        console.log("non-welch")
        item.listOfServices.forEach((service) => { service.allowed = "N" })
      }
    })

    // Enable Illiad links for Welch reading room items 
    items.forEach((item) => {
      if (item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') >= 0) {
        console.log("welch")
        item.listOfServices.forEach((service) => { service.allowed = "Y" })
      }

    })
  }])
})
