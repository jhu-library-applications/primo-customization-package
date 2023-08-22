(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);


    /* Critical cataloging customization */

/* Customization for changing full display 
Sample metadata substitutions -- only exact matches will be replaced in this example 
This will perform replacement on both CDI and local records */

var metadataSubstitutions = {
    "Illegal Aliens": "Undocumented immigrants",
    "Illegal Immigrants": "Undocumented immigrants"
}

app.component('prmServiceDetailsAfter', {
    controller: 'prmServiceDetailsAfterController',
  });

app.controller('prmServiceDetailsAfterController', ['$scope', function ($scope) {

//Get an array of the subjects to be displayed
var subjectValues = $scope.$parent.$ctrl["item"]["pnx"]["display"]["subject"]


if (subjectValues){  //Very important to test for presence of subject values
   for (var i = 0; i < subjectValues.length; i++){
      var metadataKeys = Object.keys(metadataSubstitutions)
      for (var j = 0; j < metadataKeys.length; j++){
        var metadataKey = metadataKeys[j];
          //The replace function is case-sensitive, but you can use a regular expression for case-insensitive replacement -- see https://www.sitepoint.com/community/t/javascript-replace-making-it-case-insensitive/1831
	  console.log(subjectValue[i])
	  console.log(subjectValues[i].replace(metadataKey, metadataSubstitutions[metadataKey]))
        subjectValues[i] = subjectValues[i].replace(metadataKey, metadataSubstitutions[metadataKey])
      }
    }
    //Re-sort array after tern replacement 
    $scope.$parent.$ctrl["item"]["pnx"]["display"]["subject"].sort();
 }
     
}]);
    
  app.component('prmTopBarBefore', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
  });

  app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bar-after.html"
  });

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-result-thumbnail-container-after.html"
  });


  var JHU = {
    // JHU specific customizations
    // Add custom JS that doesn't use AngularJS here 
    options: {
      customUserJourneyActive: true
    },
    userJourney: {
      observerActive: false,
      startPageOverrides: function () {
        if (!this.observerActive) {
          // Using a mutation observer allows us to watch for changes made to the DOM
          // This allows us to watch for changes that might be made through XHR requests
          // or other content dynamically added to the page
          this.observer = new MutationObserver(function () {
            var itemRequestElements = document.querySelectorAll('span[translate="AlmaItemRequest"]');
            var checkBorrowDirectSpans = document.querySelectorAll('span[translate="Check BorrowDirect"]');
            var checkIlliadSpans = document.querySelectorAll('span[translate="Go to Interlibrary Loan Form"]');
            var available = false;

            if (document.querySelector('prm-location-items .availability-status') && document.querySelector('prm-location-items .availability-status').textContent) {
              available = document.querySelector('prm-location-items .availability-status').textContent.indexOf('Available') === 0;
            }

            // Hide request button if item is not available locally 
            if (itemRequestElements && checkBorrowDirectSpans.length >= 1 && checkIlliadSpans.length >= 1 && !available) {
              itemRequestElements.forEach(function (itemRequestElement) {
                itemRequestElement.parentElement.style.display = "none";
              });

              document.querySelectorAll('.skewed-divider').forEach(function (skewedDivider) {
                skewedDivider.style.display = "none";
              });

              this.observer.disconnect();
              this.observerActive = false;
            }

            // Hide BorrowDirect and Illiad links if item is available locally
            if (itemRequestElements && checkBorrowDirectSpans.length >= 1 && checkIlliadSpans.length >= 1 && available) {
              checkBorrowDirectSpans.forEach(function (checkBorrowDirectSpan) {
                checkBorrowDirectSpan.parentElement.style.display = "none";
              });

              checkIlliadSpans.forEach(function (checkIlliadSpan) {
                checkIlliadSpan.parentElement.style.display = "none";
              });

              document.querySelectorAll('.skewed-divider').forEach(function (skewedDivider) {
                skewedDivider.style.display = "none";
              });

              this.observer.disconnect();
              this.observerActive = false;
            }
          }.bind(this)); // bind the context of this to the observer function

          this.observer.observe(document, { childList: true, subtree: true });
          this.observerActive = true;
        }
      },
    }
  };

  if (JHU.options.customUserJourneyActive) {
    JHU.userJourney.startPageOverrides();

    document.addEventListener('click', function () {
      JHU.userJourney.startPageOverrides();
    });
  }
})();

/* StackMap: Start */
(function(){

  var a = document.querySelector("head");
  var css1 = document.createElement("link");
  css1.type = "text/css";
  css1.rel = "Stylesheet";
  css1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  css1.crossorigin = "anonymous";
  a.appendChild(css1);

  var css2 = document.createElement("link");
  css2.type = "text/css";
  css2.rel = "Stylesheet";
  css2.href = "https://www.stackmapintegration.com/jhu-primo/StackMap.min.css";
  a.appendChild(css2);

  var w = document.createElement("script");
  w.type = "text/javascript"; w.async = true;
  w.src = "https://www.stackmapintegration.com/jhu-primo/StackMap.min.js";
  var b = document.body;
  b.appendChild(w);

})();
/* StackMap: END */
