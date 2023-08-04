(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

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
