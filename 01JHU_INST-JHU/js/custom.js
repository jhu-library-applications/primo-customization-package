(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  app.component('prmSearchBookmarkFilterAfter', {  
    template: `
      <help-menu-topbar>
          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                    aria-label="Submit Feedback" target="_blank"
                    href="https://jh.qualtrics.com/jfe/form/SV_8v0RG9l4bQUPpIi" title="Submit Feedback (opens in new tab)">
                    <md-icon class="md-primoExplore-theme">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>
                    </md-icon>
          </a>

        <span class="notification-indicator"></span>
      </help-menu-topbar>`
  });


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

  // This uses an HTTP interceptor to watch for responses from the server and then activate the user journey
  // This needs to be done because there are a variety of scenarios where the availabilty links are loaded and reloaded on the page
  app.config(function ($httpProvider, $provide) {
    $provide.factory('httpInterceptor', function ($q, $rootScope) {
      return {
        'response': function (response) {
          $rootScope.$broadcast('httpResponse', response);
          //console.log(response)
          if (JHU.options.customUserJourneyActive) {
            JHU.userJourney.startPageOverrides();
          }
          return response || $q.when(response);
        }
      };
    });
    $httpProvider.interceptors.push('httpInterceptor');
  });

  var JHU = {
    // JHU specific customizations
    // Add custom JS that doesn't use AngularJS here 
    options: {
      customUserJourneyActive: true
    },
    userJourney: {
      observerActive: false,
      changeItemGenre: function () {
        
      },
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
            // Welch exception 
            var welchPrintUse = document.body.textContent.includes('Onsite Print Use Only')

            if (itemRequestElements && checkBorrowDirectSpans.length >= 1 && checkIlliadSpans.length >= 1 && available && welchPrintUse) {
              checkBorrowDirectSpans.forEach(function (checkBorrowDirectSpan) {
                checkBorrowDirectSpan.parentElement.style.display = "none";
              });

              checkIlliadSpans.forEach(function (checkIlliadSpan) {
                checkIlliadSpan.parentElement.style.display = "none";
              });

              if (welchPrintUse) {
                checkIlliadSpans.forEach(function (checkIlliadSpan) {
                  checkIlliadSpan.parentElement.style.display = "block";
     
                });
              }

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
})();

/* StackMap: Start */
(function () {

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
