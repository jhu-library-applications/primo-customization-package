export const prmTopBarBefore = {
  bindings: { parentCtrl: `<` },
  templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html",
  controller: ['$scope', function ($scope) {
    this.$onInit = function () {
      const ndeAddedBanner = document.querySelector(".nde-banner");

      if (!ndeAddedBanner) {
        const ndeBanner = document.createElement("div");

        ndeBanner.classList.add("nde-banner");
        ndeBanner.setAttribute("role", "status");
        ndeBanner.setAttribute("aria-live", "polite");
        ndeBanner.setAttribute("style", "background: #F1C400; font-weight: bold; padding: 1em; text-align: center;");

        ndeBanner.innerHTML = `
            <b>Intermittent Access Problems with E-Resources:</b> the EZproxy system that enables you to link to online articles, books, and other e-resources when you are not on the campus network or VPN is unstable right now. If you get an error message when you attempt to link to e-resources, please wait a few minutes and try again. We apologize for the inconvenience and are working to resolve the problem as quickly as possible.
        `;

        document.body.prepend(ndeBanner);

        const closeButton = document.getElementById("banner-close-button");

        if (closeButton) {
          closeButton.addEventListener("click", function () {
            ndeBanner.style.display = "none";
            document.cookie = "ndeBannerClosed=true; path=/; max-age=31536000";
          });
        }
      }
    }
  }]
};
