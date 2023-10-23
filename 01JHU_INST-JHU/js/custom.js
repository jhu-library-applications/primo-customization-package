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
