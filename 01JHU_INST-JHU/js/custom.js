(() => {
  // src/interceptors/itemRequestUrlInterceptor.js
  function itemRequestUrlInterceptor() {
    return {
      request: function(config) {
        if (config.url.includes("AlmaItemRequest")) {
          if (config.method === "POST" && config.data) {
            if (config.data.genericCheckBox == "Yes") {
              delete config.data.genericCheckBox;
              try {
                config.data.comment = "Office Delivery Request: " + config.data.comment;
              } catch (error) {
                return config;
              }
            } else {
              delete config.data.genericCheckBox;
            }
          }
        }
        return config;
      },
      response: function(response) {
        if (response.config.url.includes("AlmaItemRequest")) {
          try {
            response.data["services-arr"].services.forEach(function(service) {
              service["groups-list-map"].forEach(function(item) {
                item.pickupLocation.forEach(function(location) {
                  if (location.key === "126006350007861$$LIBRARY") {
                    location.value = "Milton S. Eisenhower Library - Annex";
                  }
                });
              });
            });
          } catch (error) {
            console.log("Error modifying response:", error);
            return response;
          }
        }
        return response;
      },
      requestError: function(rejection) {
        if (rejection.config && rejection.config.url.includes("AlmaItemRequest")) {
          console.log("Request Error:", rejection);
        }
        return Promise.reject(rejection);
      },
      responseError: function(rejection) {
        if (rejection.config && rejection.config.url.includes("AlmaItemRequest")) {
          console.log("Response Error:", rejection);
        }
        return Promise.reject(rejection);
      }
    };
  }

  // src/interceptors/config.js
  function configureInterceptors(app2) {
    app2.config(["$httpProvider", function($httpProvider) {
      $httpProvider.interceptors.push("itemRequestUrlInterceptor");
    }]);
  }

  // src/components/prmTopBarBefore.js
  var prmTopBarBefore = {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
  };

  // src/components/prmSearchResultThumbnailContainerAfter.js
  var prmSearchResultThumbnailContainerAfter = {
    bindings: { parentCtrl: `<` },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-result-thumbnail-container-after.html"
  };

  // src/components/prmSearchBookmarkFilterAfter.js
  var prmSearchBookmarkFilterAfter = {
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bookmark-filter-after.html"
  };

  // src/components/prmLocationAfter.js
  var prmLocationAfter = {
    bindings: { parentCtrl: "<" },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-location-after.html",
    controller: ["AuthService", "CapitalizeService", function(AuthService2, CapitalizeService2) {
      this.capitalize = CapitalizeService2.capitalize;
      this.isLoggedIn = AuthService2.getIsLoggedIn();
      this.$onInit = function() {
        console.log("prmLocationAfter");
      };
    }]
  };

  function loadJS(FILE_URL, async = true) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "module");
    scriptEle.setAttribute("async", async);
    document.body.appendChild(scriptEle);
    // success event
    scriptEle.addEventListener("load", () => {
        console.log("File loaded")
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });

      document.querySelector('prm-static').previousSibling.remove();
      document.querySelector('prm-static').nextSibling.remove();
}

loadJS('https://jhu-library-applications.github.io/showcase-bundle/discovery-showcase.bundled.js');


  // src/components/prmAuthenticationAfter.js
  var prmAuthenticationAfter = {
    bindings: { parentCtrl: "<" },
    template: "<div></div>",
    controller: ["AuthService", function(AuthService2) {
      this.$onInit = function() {
        AuthService2.setIsLoggedIn(this.parentCtrl.isLoggedIn);
      };
    }]
  };

  // src/components/prmLocationItemsAfter.js
  var prmLocationItemsAfter = {
    bindings: { parentCtrl: "<" },
    templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-location-items-after.html",
    controller: function() {
      this.$onInit = function() {
        console.log("prmLocationItemsAfter");
      };
    }
  };

  // src/components/prmRequestAfter.js
  var prmRequestAfter = {
    bindings: { parentCtrl: "<" },
    template: `<div><style>#form_field_genericCheckBox { display: none; } #pickup-notice { display: none; }  
    .jh-attention { padding-left: .7em; font-weight: bold; }
    .jh-attention-card-content { padding: 1em 1em; }
    .jh-attention-icon { color: #A15A95; opacity: 1 !important; }
    </style>
    <div id="pickup-notice">
    <md-card md-theme="{{ showDarkTheme ? 'dark-grey' : 'default' }}" md-theme-watch>
    <md-card-title>
      <prm-icon class="giant-icon bg-icon jh-attention-icon" icon-type="svg" svg-icon-set="primo-ui" icon-definition="alert"></prm-icon>
      <div>
      <md-card-title-text>
        <span class="md-headline jh-attention">Attention</span>
      </md-card-title-text>
    </md-card-title>
    <md-card-content class="jh-attention-card-content">
    The Eisenhower Pick Up Shelf will be unavailable beginning June 18th. Pick Ups will resume at the MSE Library Annex (The building formerly known as The Hopkins Club) on the week of June 24th.
    </md-card-content>
    </div>
  </md-card>
    </div>`,
    controller: ["$scope", "primawsRest", function($scope, primawsRest2) {
      var patronStatusCode = "";
      this.$onInit = function() {
        primawsRest2.myAccountPersonalSettings().then(function successCallback(response) {
          console.log(response.data);
          patronStatusCode = response.data.data.patronstatus[0].registration[0].institution[0].patronstatuscode;
        }, function errorCallback(response) {
          console.log(response);
        });
        $scope.$watch(() => this.parentCtrl.formData["pickupLocation"], (newValue, oldValue) => {
          if (newValue !== oldValue) {
            console.log(newValue);
            this.updateCheckboxVisibility(newValue);
          }
        });
      };
      function pickupNotice(selectedLocationId) {
        const eisenhowerId = "126006350007861$$LIBRARY";
        const pickupNotice2 = document.getElementById("pickup-notice");
        if (selectedLocationId === eisenhowerId) {
          pickupNotice2.style.display = "block";
        } else {
          pickupNotice2.style.display = "none";
        }
      }
      function campusDeliveryEligible(patronStatusCode2, selectedLocationId) {
        const homewoodId = "126006350007861$$LIBRARY";
        const welchId = "126007910007861$$LIBRARY";
        const eligibleHomewoodGroups = ["jhfac", "jhgrad", "jhstf", "jhsrstf"];
        const eligibleWelchGroups = ["jhfac"];
        if (selectedLocationId === homewoodId) {
          document.querySelector("#form_field_checkbox_genericCheckBox > md-input-container > md-checkbox > div.md-label > span").textContent = "Office Delivery (Please include your Campus Mailbox Address in the Comment section)";
          return eligibleHomewoodGroups.includes(patronStatusCode2);
        }
        if (selectedLocationId === welchId) {
          document.querySelector("#form_field_checkbox_genericCheckBox > md-input-container > md-checkbox > div.md-label > span").textContent = "Office Delivery (Please include your Office Address in the Comment Section)";
          return eligibleWelchGroups.includes(patronStatusCode2);
        }
      }
      this.updateCheckboxVisibility = function(selectedLocationId) {
        const checkbox = document.getElementById("form_field_genericCheckBox");
        if (campusDeliveryEligible(patronStatusCode, selectedLocationId)) {
          checkbox.style.display = "block";
        } else {
          checkbox.style.display = "none";
        }
      };
    }]
  };

  // src/services/AuthService.js
  function AuthService() {
    var isLoggedIn = false;
    return {
      setIsLoggedIn: function(value) {
        isLoggedIn = value !== false;
      },
      getIsLoggedIn: function() {
        return isLoggedIn;
      }
    };
  }

  // src/services/CapitalizeService.js
  function CapitalizeService() {
    this.capitalize = function(string) {
      if (!string) return string;
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  }

  // src/services/primawsRest.js
  function primawsRest($http) {
    this.myAccountPersonalSettings = function() {
      return $http({
        method: "GET",
        url: "/primaws/rest/priv/myaccount/personal_settings",
        headers: {
          "Authorization": 'Bearer "' + sessionStorage.primoExploreJwt + '"'
        }
      });
    };
  }
  primawsRest.$inject = ["$http"];

  // src/app.js
  var app = angular.module("viewCustom", ["angularLoad"]);
  app.factory("itemRequestUrlInterceptor", itemRequestUrlInterceptor);
  configureInterceptors(app);
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": (/* @__PURE__ */ new Date()).getTime(),
      event: "gtm.js"
    });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-KVWVGLP");
  app.component("prmTopBarBefore", prmTopBarBefore);
  app.component("prmSearchResultThumbnailContainerAfter", prmSearchResultThumbnailContainerAfter);
  app.component("prmSearchBookmarkFilterAfter", prmSearchBookmarkFilterAfter);
  app.component("prmLocationAfter", prmLocationAfter);
  app.component("prmAuthenticationAfter", prmAuthenticationAfter);
  app.component("prmLocationItemsAfter", prmLocationItemsAfter);
  app.component("prmRequestAfter", prmRequestAfter);
  app.service("AuthService", AuthService);
  app.service("CapitalizeService", CapitalizeService);
  app.service("primawsRest", primawsRest);
  var app_default = app;
})();
