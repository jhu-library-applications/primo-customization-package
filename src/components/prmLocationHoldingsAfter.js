export const prmLocationHoldingsAfter = {
  bindings: { parentCtrl: "<" },
  templateUrl:
    "/discovery/custom/01JHU_INST-JHU/html/prm-location-holdings-after.html",
  controller: [
    "$scope",
    function ($scope) {
      var ctrl = this;

      this.$onInit = function () {
        $scope.$watch(
          function () {
            return (
              ctrl.parentCtrl &&
              ctrl.parentCtrl.currLoc &&
              ctrl.parentCtrl.currLoc.summaryHoldings
            );
          },
          function (newVal) {
            if (newVal) {
              ctrl.holdings = ctrl.parentCtrl.currLoc.summaryHoldings.allLines;
            }
          },
          true, // deep watch to detect changes in nested objects
        );
      };

      this.getAvailabilityLink = function (line) {
        var mmsId = ctrl.extractMmsId(line.value);
        return (
          "https://catalyst.library.jhu.edu/discovery/fulldisplay?docid=alma" +
          mmsId +
          "&context=L&vid=01JHU_INST:JHU"
        );
      };

      this.getLinkText = function (line) {
        var titleAuthor = ctrl.extractTitleAuthor(line.value);
        return titleAuthor.title + " - " + titleAuthor.author;
      };

      this.extractMmsId = function (values) {
        return values.find((value) => /^\d+$/.test(value)) || "";
      };

      this.extractTitleAuthor = function (values) {
        var nonMmsValues = values.filter((value) => !/^\d+$/.test(value));
        return {
          title: nonMmsValues[0] || "No title",
          author: nonMmsValues[1] || "No author",
        };
      };

      this.hasValidLink = function (line) {
        var mmsId = ctrl.extractMmsId(line.value);
        return mmsId !== "";
      };

      this.shouldShowBaseSummary = function () {
        return ctrl.parentCtrl.currLoc.locationNoItems
          ? ctrl.parentCtrl.summaryLinesVisible
          : !ctrl.parentCtrl.summaryLinesVisible;
      };

      this.getBaseSummaryLines = function () {
        return ctrl.parentCtrl.currLoc.summaryHoldings.baseSummaryShort;
      };

      this.getStyle = function () {
        return ctrl.parentCtrl.isIE && ctrl.parentCtrl.mediaQueries.xs
          ? { width: "14em" }
          : {};
      };

      this.isLink = function (value) {
        return value.startsWith("http:") || value.startsWith("https:");
      };

      this.shouldShowAllLines = function () {
        return ctrl.parentCtrl.currLoc.locationNoItems
          ? !ctrl.parentCtrl.summaryLinesVisible
          : ctrl.parentCtrl.summaryLinesVisible;
      };

      this.getAllLines = function () {
        return ctrl.parentCtrl.currLoc.summaryHoldings.allLines;
      };

      this.isAvailabilityLine = function (line) {
        return line.key === "For availability see:";
      };
    },
  ],
};
