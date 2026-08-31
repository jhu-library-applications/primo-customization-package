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
        ndeBanner.setAttribute("style", "background: #F1C400;padding: 1em; text-align: center;");

        ndeBanner.innerHTML = `
            <a href="https://t.jh.edu/nde">Preview the new Catalyst interface</a>: a new Catalyst interface is coming in 2027. Try a functional preview now and provide feedback to help us improve Catalyst.
              <button id="banner-close-button" class="md-button md-ink-ripple">&#x2715;</button>
        `;

        if (!document.cookie.split('; ').find(row => row.startsWith('ndeBannerClosed=true'))) {
          document.body.prepend(ndeBanner);
        }

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
