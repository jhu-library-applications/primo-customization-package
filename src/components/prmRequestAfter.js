export const prmRequestAfter = {
  bindings: { parentCtrl: '<' },
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
  controller: ['$scope', 'primawsRest', function ($scope, primawsRest) {
    var patronStatusCode = "";

    this.$onInit = function () {
      primawsRest.myAccountPersonalSettings().then(function successCallback(response) {
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
      const pickupNotice = document.getElementById('pickup-notice');

      if (selectedLocationId === eisenhowerId) {
        pickupNotice.style.display = 'block';
      } else {
        pickupNotice.style.display = 'none';
      }
    }

    function campusDeliveryEligible(patronStatusCode, selectedLocationId) {
      const homewoodId = "126006350007861$$LIBRARY";
      const welchId = "126007910007861$$LIBRARY";
      const eligibleHomewoodGroups = ["jhfac", "jhgrad"];
      const eligibleWelchGroups = ["jhfac"];

      if (selectedLocationId === homewoodId) {   
        document.getElementById('form_field_genericCheckBox').innerText = 'Office Delivery (Please include your Campus Mailbox Address in the Comment section)';
        document.getElementById('form_field_genericCheckBox').style.color = 'red';

        return eligibleHomewoodGroups.includes(patronStatusCode);
      }

      if (selectedLocationId === welchId) {
        document.getElementById('form_field_genericCheckBox').innerText = 'Office Delivery (Please include your Office Address in the Comment Section)';
        document.getElementById('form_field_genericCheckBox').style.color = 'red';

        return eligibleWelchGroups.includes(patronStatusCode);
      }
    }

    this.updateCheckboxVisibility = function (selectedLocationId) {
      const checkbox = document.getElementById('form_field_genericCheckBox');
      if (campusDeliveryEligible(patronStatusCode, selectedLocationId)) {
        checkbox.style.display = 'block';
      } else {
        checkbox.style.display = 'none';
      }
    };
  }]
};
