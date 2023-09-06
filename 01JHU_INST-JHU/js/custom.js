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

    // Disable BorrowDirect and Illiad links for items that are available 
    items.forEach((item) => {
      if (item._additionalData.itemstatusname === 'Item in Place' &&
        item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') < 0
      )
        item.listOfServices.forEach((service) => { service.allowed = "N" })
    })

    // Enable Illiad links for Welch reading room items 
    items.forEach((item) => {
      if (item._additionalData.secondarylocationname.indexOf('Onsite Print Use Only') >= 0) {
        item.listOfServices.forEach((service) => { service.allowed = "Y" })
      }

    })
  }])

  /* StackMap: Start */
  (function () {

    var a = document.querySelector("head")
    var css1 = document.createElement("link")
    css1.type = "text/css"
    css1.rel = "Stylesheet"
    css1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    css1.crossorigin = "anonymous"
    a.appendChild(css1)

    var css2 = document.createElement("link")
    css2.type = "text/css"
    css2.rel = "Stylesheet"
    css2.href = "https://www.stackmapintegration.com/jhu-primo/StackMap.min.css"
    a.appendChild(css2)

    var w = document.createElement("script")
    w.type = "text/javascript" w.async = true
    w.src = "https://www.stackmapintegration.com/jhu-primo/StackMap.min.js"
    var b = document.body
    b.appendChild(w)

  })()
})
